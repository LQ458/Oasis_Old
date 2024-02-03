"use client";
import Link from "next/link";
import $ from "jquery";
import { useEffect } from "react";
import Image from "next/image";
import "../src/nav.css";

const Nav = () => {
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
          <li className="nav">
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
          <li className="nav">
            <Link className="channel" data-icon="icon-3" href="/news">
              News
            </Link>
          </li>
        </div>
        <div className="dblock">
          <div className="icon icon-4">
            <Image src="/heart.svg" width="40" height="40" alt="heart" />
          </div>
          <li className="nav">
            <Link className="channel" data-icon="icon-4" href="/confession">
              Confession
            </Link>
          </li>
        </div>
        <div className="dblock">
          <div className="icon icon-5">
            <Image src="/book-outline.svg" width="40" height="40" alt="book" />
          </div>
          <li className="nav">
            <Link href="/discussion" className="channel" data-icon="icon-5">
              Discussion
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
