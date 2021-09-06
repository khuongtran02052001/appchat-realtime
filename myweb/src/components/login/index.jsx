import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import firebase from '../../firebae/config';
import { addDocument, generateKeywords } from '../../firebae/firestore';
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()

export function Login() {

    // google
    const submitGG = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch((error) => {
                console.log(error)
            });
    }


    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(fbProvider)

        addDocument('user', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName)
        })
    }
    const didMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                console.log(`success`)
            } else {
                console.log('no user')
            }
        });
    }
    return (
        <>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8} >
                    <Title style={{ textAlign: 'center' }} Level={3}>WEB CHAT</Title>
                    <Button onClick={submitGG} style={{ width: '100%', marginBottom: 5 }}>
                        LOGIN WITH GOOGLE
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleFbLogin}>
                        LOGIN WITH FACEBOOK
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default Login