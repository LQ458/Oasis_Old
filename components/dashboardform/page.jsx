"use client";
import Image from "next/image";
import { useEffect } from "react";
import $ from "jquery";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "../../app/src/dashboard.css";

export default function Dashboardform() {
  const { data: session } = useSession();
  useEffect(() => {
    var channels = $(".channel");
    for (var i = 0; i < channels.length; i++) {
      $(channels[i]).css("animation-delay", i * 0.2 + "s");
    }

    let liftInterval;

    $(function () {
      $(".channel").hover(
        function () {
          var iconClass = $(this).data("icon");
          $(".icon").removeClass("lift");
          $("." + iconClass).addClass("lift");
        },
        function () {
          $(".icon").removeClass("lift");
        },
      );
    });
    $(".channel").click(
      function () {
        var iconClass = $(this).data("icon");
        $(".icon").removeClass("lift");
        liftInterval = setInterval(() => {
          $("." + iconClass).toggleClass("lift");
        }, 500);
      },
      function () {
        clearInterval(liftInterval);
        $(".icon").removeClass("lift");
      },
    );
  }, []);
  return (
    <body className="dash">
      <title>Dashboard</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="dash">
        <div className="container">
          <div className="dblock">
            <Link href="/profile" className="icon">
              <Image
                src="/person-circle-outline.svg"
                width="60"
                height="60"
                alt="person"
              />
            </Link>
          </div>
          <div className="dblock">
            <div className="icon icon-2">
              <Image
                src="/earth-outline.svg"
                width="40"
                height="40"
                alt="earth"
              />
            </div>
            <li>
              <Link className="channel" data-icon="icon-2" href="/general">
                General
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-3">
              <Image
                src="/chatbox-outline.svg"
                width="40"
                height="40"
                alt="chatbox"
              />
            </div>
            <li>
              <Link className="channel" data-icon="icon-3" href="/announcement">
                News
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-4">
              <Image src="/heart.svg" width="40" height="40" alt="heart" />
            </div>
            <li>
              <Link className="channel" data-icon="icon-4" href="/confession">
                Confession
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-5">
              <Image src="/book-outline.svg" width="40" height="40" />
            </div>
            <li>
              <Link href="/academics" className="channel" data-icon="icon-5">
                Academics
              </Link>
            </li>
          </div>
        </div>
      </nav>
      <br />
      <section className="secd">
        <h1 className="dashh1">
          Welcome to {session?.user?.name}&apos;s Dashboard!
        </h1>
        <div className="comments">
          <h2 className="dashh2">Comments</h2>
          <div className="dashcomment">
            <p className="dashp">You have no comments yet!</p>
          </div>
        </div>
        <div className="posts">
          <h2 className="dashh2">Posts</h2>
          <div className="dashpost">
            <p className="dashp">You have no posts yet!</p>
          </div>
        </div>
        <div className="likes">
          <h2 className="dashh2">Liked Posts</h2>
          <div className="dashlike">
            <p className="dashp">You have no liked posts yet!</p>
          </div>
        </div>
        <div className="like">
          <h2 className="dashh2">Liked Comments</h2>
          <div className="dashlike">
            <p className="dashp">You have no liked comments yet!</p>
          </div>
        </div>
      </section>
    </body>
  );
}
