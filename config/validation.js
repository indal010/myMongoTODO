var validator=
      {"validationSchema":{
           "login": {
                         "email": { in: "body",
                         notEmpty: {
                         errorMessage: 'emailid field is required & cannot be blank.'
                                }
                            },
                         "password": { in: "body",
                           notEmpty: {
                          errorMessage: 'password field is required & cannot be blank.'
                          },
                       },
                          },
         "signup":{
                      "email": { in: "body",
                      notEmpty: {
                      errorMessage: 'emailid field is required & cannot be blank.'
                       },
                      isEmail: {
                      errorMessage: 'Invalid Email'
                        }
                      },
                     "name": { in: "body",
                    notEmpty: {
                    errorMessage: 'name field is required & cannot be blank.'
                      }
                    },
                      "password":{in: "body",
                        notEmpty: {
                        errorMessage: "password field is required and it can not be blank"
                      }
                      // matches: {
                      //      options: [/^[a-zA-Z0-9!@#$%^&*]{6,16}$/],
                      //        errorMessage: "enter valid password"
                      //       }
                       }
                      },
checkSystemErrors : function(err) {
    return err instanceof TypeError ||
        err instanceof SyntaxError ||
        err instanceof EvalError ||
        err instanceof RangeError ||
        err instanceof ReferenceError;
}
}
};
module.exports=validator;
