'use client'
import { IonIcon } from "@ionic/react";
import { earthOutline } from "ionicons/icons";
import Image from "next/image";
import { bookOutline } from "ionicons/icons";
import { useEffect } from "react";
import $ from "jquery";
import { useSession } from "next-auth/react";
import { personCircleOutline } from "ionicons/icons";
import "../../app/src/dashboard.css";


export default function dashboardform() {
  const { data: session } = useSession();
  useEffect(() => {
    var channels = $(".channel");
    for (var i = 0; i < channels.length; i++) {
      $(channels[i]).css('animation-delay', (i * 0.2) + "s");
    }

    $(function() {
      $('.channel').hover(function() {
        var iconClass = $(this).data('icon');
        $('.icon').removeClass('lift');
        $('.' + iconClass).addClass('lift');
        $('.' + iconClass).addClass('grad');
      }, function() {
        $('.icon').removeClass('lift');
        $('.icon').removeClass('grad');
      });
    });
  }, []);
  return (
    <div>
      <title>Dashboard</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <header id="topBar">
        <div id="topBar">
          <a href="/" className="title">
            Dashboard
          </a>
          <a href="profile" className="profile">
            <Image src="/person-circle-outline.svg" width="65" height="65" />
          </a>
        </div>
      </header>
      <h1>Hello! {session?.user?.name}</h1>
      <br />
      <br />
      <br />
      <br />
      <nav>
        <div className="container">
          <div className="block">
            <div className="icon icon-1">
            <Image src="/earth-outline.svg" width="70" height="70" />
            </div>
            <br />
            <br />
            <li>
              <a href="/general" className="channel" data-icon="icon-1">
                General
              </a>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-2">
            <Image src="/book-outline.svg" width="70" height="70" />
            </div>
            <br />
            <br />
            <li>
              <a className="channel" data-icon="icon-2" href="/academics">
                Academics
              </a>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-3">
            <Image src="/person-circle-outline.svg" width="70" height="70" />
            </div>
            <br />
            <br />
            <li>
              <a className="channel" data-icon="icon-3" href="/announcement">
                Announcement
              </a>
            </li>
          </div>
          <div className="block">
            <div className="icon icon-4">
            <Image src="/person-circle-outline.svg" width="70" height="70" />
            </div>
            <br />
            <br />
            <li>
              <a className="channel" data-icon="icon-4" href="/contact">
                Contact
              </a>
            </li>
          </div>
          {session?.user?.admin === true && (
            <a href="/admin" id="adminPage">
              Admin Page
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}
