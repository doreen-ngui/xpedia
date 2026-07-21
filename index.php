<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!-- Add Bootstrap -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Add Font Awesome -->
    <link rel="stylesheet" href="css/all.css">
</head>
<body>
    <div class="container-fluid">
        <div class="card mt-5 col-md-4 offset-md-4">
            <div class="card-header">
                <h5>Please Login</h5>
            </div>
            <div class="card-body">
                <div id="notifications"></div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control form-control-sm">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control form-control-sm">
                </div>

                <button id="loginuser" class="btn  btn-success">Login</button>
            </div>
        </div>
    </div>
   
</body>
<script src="js/jquery3.71.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/function.js"></script>
<script src="js/index.js"></script>
</html>