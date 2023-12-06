"use client";
import { IonIcon } from "@ionic/react";
import { earthOutline } from "ionicons/icons";
import { bookOutline } from "ionicons/icons";
import { useSession } from "next-auth/react";
import { personCircleOutline } from "ionicons/icons";
import SocialMedia from "../../app/(icons)/SocialMedia.jsx";
import "../../app/src/dashboard.css";

export default function dashboardform() {
  const { data: session } = useSession();
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
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: "3.3rem" }}
            />
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
              <IonIcon icon={earthOutline} style={{ fontSize: "4rem" }} />
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
              <IonIcon icon={bookOutline} style={{ fontSize: "4rem" }} />
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
              <IonIcon
                icon={personCircleOutline}
                style={{ fontSize: "4rem" }}
              />
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
              <IonIcon
                icon={personCircleOutline}
                style={{ fontSize: "4rem" }}
              />
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
      <SocialMedia />
    </div>
  );
}
