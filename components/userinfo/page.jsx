'use client'

import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import styles from "@/app/src/userinfo.css"; // Import your CSS file

const UserInfo = () => {
//   const canvasRef = useRef(null);
//   const mousePosition = {
//     x: 30 * window.innerWidth / 100,
//     y: 30 * window.innerHeight / 100
//   };

//   const dots = {
//     nb: 1000,
//     distance: 50,
//     d_radius: 100,
//     array: []
//   };

//   const generateColor = (min) => {
//     return {
//       r: colorValue(min),
//       g: colorValue(min),
//       b: colorValue(min)
//     };
//   };

//   const colorValue = (min) => {
//     return Math.floor(Math.random() * 255 + min);
//   };

//   const createColorStyle = (r, g, b) => {
//     return `rgba(${r},${g},${b},0.8)`;
//   };

//   const createDot = () => {
//     return {
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       vx: -0.5 + Math.random(),
//       vy: -0.5 + Math.random(),
//       radius: Math.random() * 2,
//       color: generateColor()
//     };
//   };

//   const createDots = () => {
//     for (let i = 0; i < dots.nb; i++) {
//       dots.array.push(createDot());
//     }
//   };

//   const moveDots = () => {
//     dots.array.forEach((dot) => {
//       if (dot.y < 0 || dot.y > window.innerHeight) {
//         dot.vy = -dot.vy;
//       } else if (dot.x < 0 || dot.x > window.innerWidth) {
//         dot.vx = -dot.vx;
//       }
//       dot.x += dot.vx;
//       dot.y += dot.vy;
//     });
//   };

//   const connectDots = () => {
//     const ctx = canvasRef.current.getContext('2d');
//     dots.array.forEach((dot, i) => {
//       for (let j = i; j < dots.nb; j++) {
//         const otherDot = dots.array[j];
//         if (
//           Math.abs(dot.x - otherDot.x) < dots.distance &&
//           Math.abs(dot.y - otherDot.y) < dots.distance
//         ) {
//           if (
//             Math.abs(dot.x - mousePosition.x) < dots.d_radius &&
//             Math.abs(dot.y - mousePosition.y) < dots.d_radius
//           ) {
//             ctx.beginPath();
//             ctx.strokeStyle = averageColorStyles(dot, otherDot);
//             ctx.moveTo(dot.x, dot.y);
//             ctx.lineTo(otherDot.x, otherDot.y);
//             ctx.stroke();
//             ctx.closePath();
//           }
//         }
//       }
//     });
//   };

//   const averageColorStyles = (dot1, dot2) => {
//     const color1 = dot1.color;
//     const color2 = dot2.color;

//     const r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius);
//     const g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius);
//     const b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);

//     return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
//   };

//   const mixComponents = (comp1, weight1, comp2, weight2) => {
//     return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
//   };

//   const drawDots = () => {
//     const ctx = canvasRef.current.getContext('2d');
//     dots.array.forEach((dot) => {
//       ctx.beginPath();
//       ctx.fillStyle = dot.color.style;
//       ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
//       ctx.fill();
//     });
//   };

//   const animateDots = () => {
//     const ctx = canvasRef.current?.getContext('2d');
  
//     // Check if ctx is available before proceeding
//     if (!ctx) {
//       // If the canvas context is not available, wait for the next animation frame
//       requestAnimationFrame(animateDots);
//       return;
//     }
  
//     ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     moveDots();
//     connectDots();
//     drawDots();
//     requestAnimationFrame(animateDots);
//   };
  

//   useEffect(() => {
//     createDots();
//     animateDots();
//   }, []);

//   const { opacity, transform } = useSpring({
//     from: { opacity: 0, transform: 'translate3d(0, -100px, 0)' },
//     to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
//   });

  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <animated.canvas
        ref={canvasRef}
        style={{ opacity, transform, position: 'fixed' }}
      > */}

      <div className="card">
        <div>
          <p className="card-text">
            Username: <span className="blue-text">{session?.user?.name}</span>
          </p>
        </div>

        <button
          onClick={() => signOut()}
          className="logout-btn"
        >
          Log Out
        </button>
      </div>
      {/* </animated.canvas> */}
    </>
  );
};

export default UserInfo;
