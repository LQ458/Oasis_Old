"use client";
import Image from "next/image";
import { useEffect } from "react";
import $ from "jquery";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "../../app/src/dashboard.css";

export default function dashboardform() {
  const { data: session } = useSession();
  useEffect(() => {
    var channels = $(".channel");
    for (var i = 0; i < channels.length; i++) {
      $(channels[i]).css("animation-delay", i * 0.2 + "s");
    }

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
  }, []);
  return (
    <body className="dash">
      <title>Dashboard</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="dash">
        <div className="container">
          <div className="block">
              <Link href="/profile" className="icon">
                <Image src="/person-circle-outline.svg" width="70" height="70" />
              </Link>
          </div>
          <div className="block">
            <div className="icon icon-2">
              <Image src="/earth-outline.svg" width="60" height="60" />
            </div>
            <li>
              <Link className="channel" data-icon="icon-2" href="/general">
                General
              </Link>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-3">
              <Image src="/person-circle-outline.svg" width="60" height="60" />
            </div>
            <li>
              <Link className="channel" data-icon="icon-3" href="/announcement">
                News
              </Link>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-4">
              <Image src="/heart.svg" width="60" height="60" />
            </div>
            <li>
              <Link className="channel" data-icon="icon-4" href="/confession">
                Confession
              </Link>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-5">
              <Image src="/book-outline.svg" width="60" height="60" />
            </div>
            <li>
              <Link href="/academics" className="channel" data-icon="icon-5">
                Academics
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </body>
  );
}
