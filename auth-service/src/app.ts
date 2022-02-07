import * as express from "express";
import * as userAuthController from './controller/user-auth';
import * as authController from './controller/authentication';

const app = express();

app.set('port', 3002);
app.use(express.json());

app.put("/credentials", userAuthController.setCredentials);
app.post('/authenticate', authController.authenticate);

app.listen(app.get('port'), () => {
    console.log("Starting auth service...");
});