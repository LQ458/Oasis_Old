'use client'
import { IonIcon } from "@ionic/react"
import {earthOutline} from "ionicons/icons"
import {bookOutline} from "ionicons/icons"
import Login from "../login/page.jsx"
import {personCircleOutline} from "ionicons/icons"
import checkAuthenticated from "../api/auth.js"
import SocialMedia from "../(icons)/SocialMedia";
import styles from '../src/dashboard.css'

const dashboard = (req,res) => {
  if(req.isAuthenticated()){
    const username = req.user.username;
    const admin = req.user.admin;
    return (
      <>
    <title>Dashboard</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <header id="topBar">
      <div id="topBar">
        <a href="intro" className="title">
          Dashboard
        </a>
      </div>
    </header>
    <h1>Hello! {username}</h1>
    <br />
    <br />
    <br />
    <br />
    <nav>
      <div className="container">
        <div className="block">
          <div className="icon icon-1">
          <IonIcon
        icon={earthOutline}
        style={{ fontSize: "4rem" }}
      />
          </div>
          <br />
          <br />
          <li>
            <a className="channel" data-icon="icon-1" href="general">
              General
            </a>
          </li>
        </div>
        <div className="block">
          <div className="icon icon-2">
          <IonIcon
        icon={bookOutline}
        style={{ fontSize: "4rem" }}
      />
          </div>
          <br />
          <br />
          <li>
            <a className="channel" data-icon="icon-2" href="academics">
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
            <a className="channel" data-icon="icon-3" href="announcement">
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
            <a className="channel" data-icon="icon-4" href="contact">
              Contact
            </a>
            </li>
          </div>
          {admin === true && 
            <a id="adminPage" href="adminMain">
              admin page
            </a>
          }
          </div>
      </nav>
    <SocialMedia />
  </>
  
    )
  }
  else return(<Login />)
}

export default dashboard