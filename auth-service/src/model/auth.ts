import * as mongoose from 'mongoose';
import 'dotenv/config'

const url: string = `mongodb://${process.env.DB_HOST_NAME}:27017/userauthdb`

mongoose.connect(url, (error => {
    if (error) {
        console.log("Error occurred while connecting to the database!!!", error)
    } else {
        console.log(`Successfully connected to Mongo DB at ${url}`)
    }
}));

export const UserAuthenticationSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
}, {
    collection: "user-authentication"
});

export const UserTokenSchema = new mongoose.Schema({
    username: {type: String, required: true},
    token: {type: String, required: true},
    validity: {type: Date, required: true}
})

export const UserAuth = mongoose.model('UserAuth', UserAuthenticationSchema);
export const AuthToken = mongoose.model('AuthToken', UserTokenSchema);