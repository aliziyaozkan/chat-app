import React from "react";
import { useFormik } from "formik";
import "../styles/login.css";
import { requiredSchema } from "../components/Yup";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup, FacebookAuthProvider
} from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore();

function Auth() {
    const generateRandomUsername = () => {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `kullanici${randomString}`;
    };

    const createUserProfile = async (user) => {
        const userRef = doc(db, "users", user.uid);

        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            const username = generateRandomUsername();

            await setDoc(userRef, {
                username: username,
                email: user.email,
                createdAt: new Date(),
            });
            console.log("Yeni Kullanıcı Adı: ", username);
        } else {
            console.log("Kullanıcı zaten var: ", userDoc.data().username);
        }
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            permission: false,
        },
        validationSchema: requiredSchema,
        onSubmit: (values, actions) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        toast.success("Kayıt olma işlemi başarıyla gerçekleştirildi!");
                        actions.resetForm();
                        createUserProfile(user);
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formik.values;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("Giriş başarılı!");
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogle = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithPopup(auth, provider);
            toast.success("Google ile giriş başarılı!");
            createUserProfile(response.user);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleFacebook = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithPopup(auth, facebookProvider);
            toast.success("Facebook ile giriş başarılı!");
            createUserProfile(response.user);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 style={{
                marginLeft: '20px',
                fontFamily: " 'Boldonse' , sans-serif"
            }}>myApp</h1>
            <form onSubmit={formik.handleSubmit} className="login-card">
                <h2>Giriş Yap / Kaydol</h2>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email adresinizi giriniz..."
                    className="login-input"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}

                <label>Şifre</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Şifrenizi giriniz..."
                    className="login-input"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                        type="checkbox"
                        name="permission"
                        className="login-checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.permission}
                    />
                    <label>Kullanıcı sözleşmesini okudum ve onaylıyorum.</label>
                </div>
                {formik.errors.permission && <p style={{ color: "red" }}>{formik.errors.permission}</p>}

                <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
                    <button type="submit" className="login-btn" onClick={handleLogin}>
                        Giriş Yap
                    </button>
                    <button type="submit" className="register-btn">
                        Kaydol
                    </button>
                </div>

                <button type='button'
                    onClick={handleGoogle}
                    className='google-button'><img src='src/images/google.png' style={{
                        width: '20px', height: '15px', marginRight: '15px'
                    }} />Google ile giriş yap</button>

                <button type="button" onClick={handleFacebook}
                    className='facebook-button'><img src='src/images/fb.png' style={{
                        width: '20px', height: '15px', marginRight: '5px'
                    }} />Facebook ile giriş yap</button>
            </form>
        </div>
    );
}

export default Auth;
