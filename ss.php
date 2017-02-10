
<!DOCTYPE html>
<html>
    <head>
        <!--Import Font awesome Icon Font-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,400' rel='stylesheet' type='text/css'>
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href=" css/materialize.css"  media="screen,projection"/>
        <link type="text/css" rel="stylesheet" href=" css/login.css" />
        <link rel="icon" type="image/png" href="myIcon.png">
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
        <title>Notapp - Login</title>
        
    </head>
    
    <body>
        
           
        
        
        <main>
            <nav class="teal">
            
            </nav>
            <div class="row container">
                <div class="card white col s12 m8 offset-m2 l6 offset-l3">
                    <form method="post" id="formValidate" action="index">
                        <div class="row">
                            
                            <h2 class="center-align"><img src=" graphics/notapp.png" height="70px">Notapp</h2>
                            
                            <p class="error-msg"></p>
                            
                            <div class="input-field col  s12 m10 offset-m1">
                                <i class="material-icons prefix">person</i>
                                <input id="username" name="username" type="text" 
                                        
                                       data-error=".error1" class="">
                                <label for="username">Username</label>
                                <div class="error1"></div>
                            </div>
                            <div class="input-field col s12 m10 offset-m1">
                                <i class="material-icons prefix">vpn_key</i>
                                <input id="password" name="password" type="password" data-error=".error2" class="">
                                <label for="password">Password</label>
                                <div class="error2"></div>
                            </div>
                            
                            <div class="col offset-m1 remember">
                                <input type="checkbox" name="remember" id="remember" class="filled-in" />
                                <label for="remember">Remember Me</label>
                            </div>
                        </div>
                        
                        <div class="card-action">
                            
                            <div class="row">
                               
                                <button type="submit" name="login" value="LOGIN" class="btn waves-effect waves-light col s4 offset-s1" >Login</button>
                                
                                <a href="register">                                    
                                    <div class="btn col wave-effect waves-light s4 offset-s2">Register</div>
                                </a>
                                
                            </div>
                            
                        </div>

                    </form>
                    
                    <div class="about col s12">
                        <a href="aboutus" class="btn-floating btn-large waves-effect waves-light teal"><i class="material-icons">developer_mode</i></a>

                    </div>        
                </div>
            </div>
        </main>
        
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src=" js/materialize.js"></script>
        <script type="text/javascript" src=" js/jquery.validate.js"></script>
        <script type="text/javascript" src=" js/login.js"></script>
        
        <script>
            $(document).ready(function() {
            
            $('select').material_select();
                
            
            });

        </script>
        
    </body>
</html>