import React from 'react';
import {getAuth,createUserWithEmailAndPassword,getFirestore, collection, getDocs,db,setDoc,doc} from '../../firebase/firebase';

import {Grid,Form,Segment,Button,Header,Icon,Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Register extends React.Component{
    state={
        username:"",
        email:"",
        password: "",
        passwordComfirmation: "",
        errors: [],
        loading: false,
        userref: collection(db, 'users')
    }

    isFormValid = ()=>{
        let errors = [];
        let error;
        if(this.isFormEmty(this.state)){
            error = {code:"Fill the all fields"};
            this.setState({errors: errors.concat(error)});
            return false;
        }else if(!this.isPasswordValid(this.state)){
            error = {code:"Password is invalid"};
            this.setState({errors: errors.concat(error)});
            return false;
        }else{
            return true;
        }
    }

    isFormEmty = ({username,email,password,passwordComfirmation})=>{
        return !username.length || !email.length || !password.length || !passwordComfirmation.length;
    }

    isPasswordValid = ({password,passwordComfirmation}) => {
        if(password.length < 8 || passwordComfirmation.length < 8){
            return false;
        }else if(password !== passwordComfirmation){
            return false
        }else{
            return true
        }
    }

    displayError = error => error.map((error,i)=><p key={i}>{error.code}</p>)

    hndleChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        if(this.isFormValid()){
            this.setState({errors:[],loading:true})
            createUserWithEmailAndPassword(getAuth(),this.state.email,this.state.password).then(newuser=>{
                newuser.user.displayName = this.state.username
                console.log(newuser)
                this.saveUser(newuser).then(()=>{
                    console.log("user save")
                })
                this.setState({loading:false})
            })
            .catch(err=>{
                this.setState({errors: this.state.errors.concat(err),loading:false})
            })
        }

    }

    saveUser = async (newuser)=>{
        return await setDoc(doc(db, "data", "one"), {
            name: newuser.user.displayName
        });

            
       
    }

    handleInputError = (errors,name)=>{
        return errors.some((error)=>error.code.toLowerCase().includes(name))?'error':''
   }
    render(){

        const {username,email,password,passwordComfirmation,errors,loading} = this.state
        return(
            <Grid textAlign="center" style={{marginTop:"100px"}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="teal" textAlign="center">
                        <Icon name="object ungroup" color="teal"></Icon>
                        Let's Join For MERN ADDA
                        <Form onSubmit={this.handleSubmit} style={{marginTop:"20px"}}>
                            <Segment stacked>
                                <Form.Input fluid name="username"  placeholder="User Name" onChange={this.hndleChange} type="text" value={username}></Form.Input>
                                <Form.Input fluid name="email"  placeholder="Email" onChange={this.hndleChange} type="email" value={email} className={this.handleInputError(errors,"email")}></Form.Input>
                                <Form.Input fluid name="password"  placeholder="Password" onChange={this.hndleChange} type="password" value={password} className={this.handleInputError(errors,"password")}></Form.Input>
                                <Form.Input fluid name="passwordComfirmation"  placeholder="Confirm Password" onChange={this.hndleChange} type="password" value={passwordComfirmation} className={this.handleInputError(errors,"password")}></Form.Input>
                                {this.state.errors.length > 0 &&(
                                    <Message negative>
                                    <Message.Header>Error</Message.Header>
                                    <p>{this.displayError(this.state.errors)}</p>
                                </Message>
                                )}
                                <Button disabled={loading} className={loading ? 'loading' : ''} color="teal" fluid size="large">Submit</Button>
                            </Segment>
                        </Form>
                        <Message size="mini">Have an account? <Link to="/login">Login</Link> </Message>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;