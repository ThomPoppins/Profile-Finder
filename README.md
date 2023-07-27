# Vind-Expert v0.5.0

## v0.5.0

> Conditional rendering of the app's main routes, access is only possible after sign up and log in.

> After sign up user authorize cookies will be set, and when you login you have a auth_token and a user_id. When you log off those cookies are destroyed and you are unauthorized again.

> Hard coded values are now in an environment file, out of sight out of mind.

> Get user data from the server /user API endpoint, after sending a request with at least the user_id, you get back the complete document from the users collection on MongoDB.

## v0.4.0

> Finished server API end point /login, users kan now login to te site and will be redirected to the client /dashboard route to start using the app right away!

> When a user Signs up or logs in then there will be generated a JSON Web Token and that will expire in 90 days.

> People will get redirected to the /onboarding page after successful sign up and after they put in the rest of their personal details they will get redirected to the /dashboard page.

> After Sign up the user gets navigated to the /onboarding route and if user fills in additional info on that page, the userdata is saved in the MongoDB collection 'users'.

## v0.3.0

> Redirect to /onboarding after Sign Up form when success

> Create backend /login API end point

> Vercel.com cronjob configured that Vercel start server/api/cronjob, I hope, so the frontend and backend both can be deployed.

> AuthToken now generated and saved inside a auth_token cookie

> AuthModal test written by Copilot.

> Set up the environment files for prod and dev environment

## v0.2.0

#### Frontend:

> Modal with registration form hides automatically after finishing the register successfully.

> Set up a new form on /onboarding, where additional user profile configurations can be set and users can extend their account with personal information and configure their profile picture.

> On /dashboard I am developing what the user will see after they search on the homepage, or else on the website. They will see the best/popular/most engaging and most trustworthy profiles first. The search results are not listed in a standard list, but will appear vertical with a big image up front, so you have much more an idea what kind of company it is and company's will have to compete and pay attention for the first impression the user will have of them, get skipped or clicked? You can swipe the profiles away for now, this will be different when I get more work in.

> Visually set up a skeleton of a chatfunctionality in anybody's useraccount. You can find this at /dashboard and then the left panel. Chat is not functional yet. (That rhymes!)

#### Backend:

> Set up Node.js backend server environment written using Express.js.

> The backend of the Webapp is still in development, it is hosted separately from the clientside, Hosted on a different port. The backend server environment listens to port 8000 while the frontend client side is hosted to port 3000, the server- and client side have 2 different origins. I've had to configure CORS to allow allow-origin requests. CORS is a middleware that is executed before a request is sent. CORS allows data to be shared between 2 different origins. because this is blocked by default for security reasons.

> GET /users API endpoint returns all users with all their data in the 'users' collection

> POST /signup API endpoint process"es the POST formdata from the submit of the registration form in the Modal that appears when you click on "Create account". The email address is stored in lower case letters. An user_id is generated with uuid, generation method called "version 1" which is a timestamp based method.

> Also the with bcrypt encrypted password hash will be saved to compare later when the users log in.

> User data from the SignUp form is collected and inserted in the MongoDB database collection 'users'.

> After inserting the new user in the 'users' collection, a JSON Web Token will be signed to this individual user. A token is assigned to a user in order to authorize them visiting personal pages and configure his account.

## v0.1.0

#### Frontend:

> Frontend homepage design with beautiful background image.

> Register and Login modal pop up after clicking "Create Account" or login. Form does not submit data so it will be saved in database.

>
