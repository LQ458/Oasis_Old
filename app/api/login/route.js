import { DBconnect, DBclose } from "@/app/libs/mongodb";
import { NextResponse } from "next/server.js";
import User from "../user.js";

export async function POST(request) {
    try {
      await DBconnect();

      const { username, password } = await request.json();
      const user = await User.findOne({ username });
  
      if (!user || user.password !== password) {
        console.error('Incorrect username or password');
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
  
      const indicator = true;
      const response = NextResponse.json({ indicator });
  
      console.log('Authentication succeeded');
      return response;
    } catch (error) {
      console.error('Error during authentication', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
      await DBclose();
    }
  }

export async function GET(request){
    await DBconnect();
    let ind
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!user) {
        ind = false;
      }
    })
      ind = true;
    NextResponse.json({ind});
    await DBclose();
}

// export async function GET(request) {
//   try {
//     await DBconnect();
//     const { username, password } = await request.json();

//     return new Promise((resolve, reject) => {
//       passport.authenticate('local', { username, password }, (err, user, info) => {
//         if (err || !user) {
//           console.error(err || info.message);
//           const ind = false;
//           const response = NextResponse.json({ ind });
//           resolve(response);
//         } else {
//           const successMessage = "Authentication successful";
//           console.log(successMessage);
//           const ind = true;
//           const response = NextResponse.json({ ind, message: successMessage });
//           resolve(response);
//         }
//       })(request, {}, () => {});
//     });
//   } catch (error) {
//     console.error("Error during authentication", error);
//     return new NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   } finally {
//     await DBclose();
//   }
// }