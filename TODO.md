# TODO:

### TODO: BUG! /dashboard: investigate why the useEffect() is looping and how to solve this isSecureContext, it has something to do with the state change of users and genderedUsers. Find how it has to work when not run on state changes of user and genderedUsers.

### TODO: Find out and decide how to develop Customer.js model to backend and use it in all places and find out advantages and disadvantages.

### TODO: Implement Formik form validation and maybe form submission to all forms.

### TODO: Log errors on the client side and on the server side.

### TODO: Implement Three.js animation on the title in Home.js

To use Three.js in your React app in /client, you can follow these steps:

Install Three.js and its dependencies using npm:

```
npm install three react-three-fiber
```

Import the necessary components from Three.js and react-three-fiber in your React component:

```
import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Box } from 'three'
```

Create a Three.js scene inside your React component using the Canvas component from react-three-fiber:

```
function Scene() {
  const boxRef = useRef()

  useFrame(() => {
    boxRef.current.rotation.x += 0.01
    boxRef.current.rotation.y += 0.01
  })

  return (
    <Box ref={boxRef}>
      <meshStandardMaterial attach="material" color="hotpink" />
    </Box>
  )
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}
```

Render the Canvas component inside your React component.

```
function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}
```

This is a basic example of how to use Three.js in a React app. You can customize the scene and add more components to create more complex 3D animations and graphics.

### Really start animating the title in Home.js

Install Three.js and its dependencies using npm:

```
npm install three react-three-fiber
```

Import the necessary components from Three.js and react-three-fiber in your Home component:

```
import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Text } from 'troika-three-text'

```

Create a Three.js scene inside your Home component using the Canvas component from react-three-fiber:

```
function Scene() {
  const textRef = useRef()

  useFrame(() => {
    textRef.current.material.uniforms.time.value += 0.05
  })

  return (
    <Text
      ref={textRef}
      text="Your Title Here"
      font="https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf"
      fontSize={80}
      maxWidth={500}
      lineHeight={1}
      letterSpacing={-0.05}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
    >
      <meshStandardMaterial attach="material" color="hotpink" />
    </Text>
  )
}

function Home() {
  return (
    <div>
      <Canvas>
        <Scene />
      </Canvas>
      <h1>Your Title Here</h1>
    </div>
  )
}
```

Render the Canvas component inside your Home component.

```
function Home() {
  return (
    <div>
      <Canvas>
        <Scene />
      </Canvas>
      <h1>Your Title Here</h1>
    </div>
  )
}
```

This is a basic example of how to animate a title with Three.js in a React app. You can customize the text and add more components to create more complex 3D animations and graphics.

### This is another explanation more exact for Home.js:

To implement Three.js animations on the `<h1>` title in Home.js, you can use the `react-three-fiber` library, which provides a way to use Three.js in a React application.

Here's an example of how you can use react-three-fiber to animate the `<h1>` title:

1. Install the `react-three-fiber` library using npm:

```
npm install react-three-fiber
```

2. Import the Canvas component from react-three-fiber in your Home.js file:

```
import { Canvas } from "react-three-fiber";
```

3. Create a new component called Title that will render the `<h1>` title using Three.js:

```
const Title = () => {
  // useThree is a hook that provides access to the Three.js scene, camera, and renderer
  const { size } = useThree();

  // useFrame is a hook that runs a function on every frame of the animation loop
  useFrame(() => {
    // animate the title here
  });

  return (
    <mesh position={[0, 0, 0]}>
      <textGeometry attach="geometry" args={["VIND-EXPERT"]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};
```

4. Replace the `<h1>` title with the Canvas component and the Title component:

```
<Canvas>
  <Title />
</Canvas>
```

5. In the useFrame function of the Title component, you can use Three.js to animate the title. For example, you can rotate the title around the y-axis:

```
useFrame(({ clock }) => {
  const elapsedTime = clock.getElapsedTime();
  mesh.current.rotation.y = elapsedTime;
});
```

6. You can also add other animations to the Title component, such as changing the color or position of the title.

```
import React, { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Nav } from "../components";
import { AuthModal } from "../modals";

const Title = () => {
  const { size } = useThree();
  const mesh = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    mesh.current.rotation.y = elapsedTime;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <textGeometry attach="geometry" args={["VIND-EXPERT"]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const Home = ({ authToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <>
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <Canvas>
        <Title />
      </Canvas>
      <div className="home">
        <h2 className="secondary-title">Door Thom Veldpaus</h2>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </>
  );
};

export default Home;

```

In this example, we're using the useRef hook to create a reference to the mesh object, which is the Three.js object hat represents the `<h1>` title. We're also using the clock object to get the elapsed time since the animation started, and then setting the rotation of the mesh object to the elapsed time around the y-axis.

### TODO: Add Google and Facebook authentication to my website:

To add Google and Facebook authentication to your website, you can use the Passport.js library. Passport.js is a popular authentication library for Node.js that supports many different authentication methods, including Google and Facebook.

### TODO: Protect against CSRF on my website:

Cross-site request forgery (CSRF) is a type of attack where a malicious website or script tricks a user into performing an action on a different website without their knowledge or consent. For example, an attacker could create a form on their website that submits a request to a vulnerable endpoint on your website, causing the user's browser to execute the request and perform an action on your website without their knowledge.

To prevent CSRF attacks in your web application, you can use several security measures:

Use CSRF tokens: A CSRF token is a unique value that is generated by the server and included in each form or request. The token is then validated by the server to ensure that the request is coming from a trusted source. You can use a library like csurf to generate and validate CSRF tokens in your Express.js application.

Use same-site cookies: Same-site cookies are cookies that are only sent to the same site that set them. This prevents the user's browser from sending cookies to a different site, which can help prevent CSRF attacks. You can set the SameSite attribute on your cookies to enforce same-site behavior.

Use HTTP-only cookies: HTTP-only cookies are cookies that can only be accessed by the server and are not accessible to client-side scripts. This can help prevent attackers from stealing cookies and using them to perform CSRF attacks.

Use CORS headers: Cross-origin resource sharing (CORS) headers can be used to restrict access to your API endpoints to trusted domains. This can help prevent attackers from using their own website to submit requests to your API endpoints.

Overall, preventing CSRF attacks requires a combination of server-side and client-side security measures. By using CSRF tokens, same-site cookies, HTTP-only cookies, and CORS headers, you can help prevent attackers from tricking users into performing actions on your website without their knowledge or consent.

### TODO: Protect against most common security threats:

There are several common threats to web applications, and reducing the risks of these threats requires a comprehensive approach that involves both frontend and backend security measures. Here are some of the most common threats to web applications and how you can reduce the risks:

Injection attacks: Injection attacks like SQL injection and cross-site scripting (XSS) can allow attackers to execute malicious code on your server or steal sensitive data from your users. To reduce the risks of injection attacks, you should use parameterized queries when interacting with a database, sanitize user input to prevent XSS attacks, and use content security policies to restrict the sources of scripts and other resources.

Broken authentication and session management: Weak authentication and session management can allow attackers to gain unauthorized access to user accounts or steal session tokens. To reduce the risks of broken authentication and session management, you should use strong password hashing algorithms like bcrypt, use HTTPS to encrypt user data in transit, and use secure session management techniques like expiring sessions after a period of inactivity.

Cross-site request forgery (CSRF): CSRF attacks can allow attackers to trick users into performing actions on your website without their knowledge or consent. To reduce the risks of CSRF attacks, you should use CSRF tokens, same-site cookies, HTTP-only cookies, and CORS headers.

Insufficient logging and monitoring: Insufficient logging and monitoring can make it difficult to detect and respond to security incidents. To reduce the risks of insufficient logging and monitoring, you should use logging frameworks like Winston or Bunyan to log security events, use intrusion detection systems to monitor network traffic, and use security information and event management (SIEM) systems to aggregate and analyze security logs.

Insecure third-party dependencies: Insecure third-party dependencies like outdated libraries or frameworks can introduce vulnerabilities into your application. To reduce the risks of insecure third-party dependencies, you should regularly update your dependencies to the latest versions, use tools like npm audit or snyk to scan for vulnerabilities, and use a content delivery network (CDN) to serve third-party dependencies from a trusted source.

Overall, reducing the risks of web application threats requires a comprehensive approach that involves both frontend and backend security measures. By using a combination of input validation, input sanitization, parameterized queries, secure authentication and session management, CSRF protection, logging and monitoring, and secure third-party dependencies, you can help prevent attacks and protect user data.
