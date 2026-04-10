const styleConfig = {
    style: {
        state: {
            default: {
                global:{
                                  
                },

                payButton:{              
                    width:'400px',
                    height:'54px',
                    backgroundcolor:'#008aff',
                    fontFamily:'Hlevetica',
                    fontWeight:'400',
                    fontSize:'16px',
                    color:'#ffffff',

                    border:'solid 0px',
                    borderColor:'#008aff',
                    borderRadius:'8px',

                    padding:'28px',
                    margin:'0px',              
                    },

                card: {
                  backgroundColor: '#ffffff',
                        backgroundColorActive:'#ffffff',
                        
                        //Borders
                        borderColor:'#DEE2E6',
                        bordercolorActive:'#008aff',
                        borderWidth: '1px',
                        borderRadius: '8px',

                        //Spacing
                        padding:'28px',
                        height:'auto',
                        width:'auto',     
                      
                     title:{   
                        fontFamily:'Helvetica',
                        fontSize:'16px',
                        fontWeight:'500',
                        fontWeightActive:'600',
                        color:'#4B5563',
                        colorActive:'#4B5563',
                    },
                     
                      //Divider
                      divider:{
                      display:'none',
                      color:'#E7E7E7',
                      Width:'100%',
                      height:'1px',
                      Padding:'24px 0px 24px 0px',
                    },

                    //RadioButton before "Card" titile
                    selectionRadioButton:{
                        display:'none',
                        height:'16px',
                        colorSelected:'#008aff',
                        sizeSelected:'8px',
                        margin:'20px 0px 20px 0px',                      
                    }, 

                    //Input textfields    
                    textInput:{
                              height:'48px',
                              padding:'16px',
                              border:'1px',
                              borderColor:'#DEE2E6',
                              borderRadius:'6px',
                              boxShadowActive:'box-shadow: 0 0 0 4px rgba(0, 138, 255, 0.20);',
                              margin:'12px 24px 12px 24px',
                              
                              //input field label, ie "First Name"
                              title:{
                                fontFamily:'Helvetica',
                                color:'#64748B',
                                fontWeight:'500',
                                fontSize:'14px',
                              },
                              //hint text, ie "John Doe"
                              placeholderText:{
                                fontFamily:'Helvetica',
                                color:'#7D8A9B',
                                fontWeight:'400',
                                fontSize:'16px',
                              },
                              //body text typed in the input field
                              inputText:{
                                fontFamily:'Helvetica',
                                color:'#4B5563',
                                fontWeight:'400',
                                fontSize:'16px',
                              },
                            //inline error messages under the input field
                              inlineErrorMessage:{
                                fontFamily:'Helvetica',
                                color:'#FF2E3D',
                                fontWeight:'400',
                                fontSize:'12px',
                                margin:'2px 0px 0px 0px',
                              },
                            },   

                    //CVV icon that explains what is a CVV
                    cvvIcon:{
                                display:'inline',
                                color:'#ABB5BE',
                                height:'18px',
                                'vertical-align':'middle',                      
                                },  

                    //card brand icon (Visa, MC, Discover, Amex...)
                    cardBrandIcon:{
                        display:'inline', //
                        margin:'0 0 24 0',
                        height:'24px',
                        'vertical-align':'middle',
                        width:'120px',
                    },

                //tax display in US
                    taxDisplay:{
                        fontFamily:'Hlevetica',
                        fontWeight:'400',
                        fontSize:'16px',
                        color:'#4B5563',                        
                    },

                //Save for future usage checkbox and text
                    saveForFuture:{
                        fontFamily:'Hlevetica',
                        fontWeight:'400',
                        fontSize:'14px',
                        color:'#4B5563', 
                        margin:'6px 0px 6px 0px',
                    },

                    caSubscriptionLawTitleText:{
                      fontFamily:'Hlevetica',
                      fontWeight:'500',
                      fontSize:'14px',
                      color:'#4B5563', 
                      margin:'6px 0px 6px 0px',
                    },

                    caSubscriptionLawBodytext:{
                      fontFamily:'Hlevetica',
                      fontWeight:'400',
                      fontSize:'14px',
                      color:'#4B5563', 
                      margin:'6px 0px 6px 0px',
                    },

                  //If customer has a saved card, there will be an express one click pay button
                    oneClickPay:{
                      width:'400px',
                      height:'54px',
                      backgroundcolor:'#008aff',
                      fontFamily:'Hlevetica',
                      fontWeight:'400',
                      fontSize:'16px',
                      color:'#ffffff',
    
                      border:'solid 0px',
                      borderColor:'#008aff',
                      borderRadius:'8px',
    
                      padding:'28px',
                      margin:'0px', 
                    },
                },
            hover:{

              payButton:{ 
              backgroundColor:'#2563EB',
              color:'#ffffff',
              borderColor:'#2563EB',
              },

              card:{
                backgroundColor:'#ffffff',
                borderColor: '#DEE2E6',

                title:{
                  fontWeight:'600',
                  color:'#4B5563',
                },

                textInput:{
                  borderColor:'#757575',
                  backgroundColor:'#ffffff',

                }

              },

              oneClickPay:{
                backgroundColor:'#2563EB',
                borderColor:'#2563EB',
                color:'#ffffff',
              },


            },
            
            error:{
                //error message
                color:'#FF2E3D',
                borderColor:'#FF2E3D',
                backgroundColor:'#FFEAEC',             
                fontFamily:'Helvetica',
                fontSize:'16px',

                //error states of textfield
                boxShadow:'0 0 0 3px rgba(220, 53, 69, 0.20)',                
            },

            loading:{
              //gradient background           
              background: linear-gradient(270deg,#F8F9FA 0%,#CED4DA 100%),             
          }
            },
        },
    }
};
