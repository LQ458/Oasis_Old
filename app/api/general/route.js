import DBconnect from "@/app/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import { compressImages } from "@/models/compression";
import {middleware} from "@/models/uploadfile";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    await middleware(req, res);
    await DBconnect();
    
    const [body] = await req.body;
    console.log(body.title);

    let anonymous = req.body.postAnonymous ? true : false;
    const fileNumbers = req.files ? req.files.length : 0;  // Corrected usage of req.files

    const inputFiles = [];
    const outputFolderPath = '@/app/public/postspic/';  // Corrected output folder path

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      group: req.body.group,
      username: req.body.username,
      postAnonymous: anonymous,
      pictures: fileNumbers,
      pictureUrl: []
    });

    if (req.files && req.files.length >= 1) {
      req.files.forEach(function (file) {
        post.pictureUrl.push({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          size: file.size
        });
        console.log(file.filename);
        inputFiles.push('@/app/public/uploads/' + file.filename);  // Corrected input file path
      });
    }

    compressImages(inputFiles, outputFolderPath);

    await post.save().then(() => {
      console.log('Post saved');
    });

    console.log(post.pictures);
    return NextResponse.json({ message: 'Post Created' }, { status: 201 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}


export async function GET() {
    await DBconnect();
    const posts = await Post.find({ group: 'general' });
    const postslikes = await Like.find({ group: 'general' });
    return NextResponse.json({ posts }, { postslikes });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await DBconnect();
  await Post.findByIdAndDelete(id);
  await Like.findOneAndDelete({postId: id});
  
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}