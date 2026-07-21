<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <?php 
        require_once("headers.html"); 
    ?>
</head>
<body> 
    <?php
        require_once("navigation.html");
    ?>
    <div class="container-fluid">
       
        
        <div class="card">
            <div class="card-body">
                <!-- Create a tabs list -->
                <!-- Counties, Cities, Airlines, Currencies, etc -->

                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="countries-tab" data-toggle="tab" data-target="#countries" type="button" role="tab" aria-controls="countries" aria-selected="true">Countries</button>
                        <button class="nav-link" id="cities-tab" data-toggle="tab" data-target="#cities" type="button" role="tab" aria-controls="cities" aria-selected="false">Cities</button>
                        <button class="nav-link" id="airlines-tab" data-toggle="tab" data-target="#airlines" type="button" role="tab" aria-controls="airlines" aria-selected="false">Airlines</button>
                        <button class="nav-link" id="currencies-tab" data-toggle="tab" data-target="#currencies" type="button" role="tab" aria-controls="currencies" aria-selected="false">Currencies</button>
                    </div>
                </nav>
                <!-- Tab Content -->
                <div class="tab-content mt-3" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="countries" role="tabpanel" aria-labelledby="countries-tab">
                        <div id="countynotifications"></div>
                        <table class="table table-sm table-hover" id="countriestable">
                            <thead>
                                <th>#</th>
                                <th>County Name</th>
                                <!-- <th>Flag</th> -->
                                <th>Date Added</th>
                                <th>Added By</th>
                                <th>&nbsp;</th><!-- Edit -->
                                <th>&nbsp;</th> <!-- Delete -->
                            </thead>
                            <tbody></tbody>
                        </table>
                        <button id="addnewcountry" class="btn btn-sm btn-success"><i class="fas fa-plus fa-lg fa-fw"></i> Add New Country</button>
                    </div>
                    <div class="tab-pane fade" id="cities" role="tabpanel" aria-labelledby="cities-tab">
                        <h5>Cities</h5>
                    </div>
                    <div class="tab-pane fade" id="airlines" role="tabpanel" aria-labelledby="airlines-tab">
                        <h5>Airlines</h5>
                    </div>
                    <div class="tab-pane fade" id="currencies" role="tabpanel" aria-labelledby="currencies-tab">
                        <h5>Currencies</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <!-- Modal for county details -->
    <div class="modal" tabindex="-1" id="countrydetailsmodal">
        <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Country Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="countrydetailsnotifications"></div>
                    <input type="hidden" name="countryid" id="countryid" value="0">
                    <div class="form-group">
                        <label for="countryname">Country Name</label>
                        <input type="text" name="countryname" id="countryname" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savecountry"><i class="fas fa-save fa-lg fa-fw"></i> Save changes</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal"><i class="fas fa-times fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
    require_once("footer.html");
?>
<script src="js/settings.js"></script>
</html>