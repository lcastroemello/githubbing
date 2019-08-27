console.log("testing");
(function() {
    //////////////////////////////DO NOT TOUCH THIS AREA - Handlebars////////////////////////////
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    ////////////////////////////////////////////////////////////////////////////////////////
    var username, password, userToSearch, projectName;

    $(".submit-button").on("click", function() {
        // console.log("submit button works");
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        userToSearch = $('input[name="user-to-search"]').val();
        var baseUrl = "https://api.github.com";
        var endpoint = "/users/" + userToSearch + "/repos";
        $.ajax({
            url: baseUrl + endpoint,
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(response) {
                console.log("response: ", response);
                var myReposTemplate = Handlebars.templates.reposTemplate({
                    repos: response
                });
                $(".repos-container").html(myReposTemplate);
            } //end of the success function
        });
        //end of the main ajax function
    }); //end of submit-button event
    //
    //
    $(document).on("click", ".eachItem", function(e) {
        console.log("click on each project works");
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        projectName = $(e.target).text();
        console.log("this is project name", projectName);
        var baseUrl = "https://api.github.com";
        var endpoint = "/repos/" + projectName + "/commits";
        $.ajax({
            url: baseUrl + endpoint,
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(response) {
                console.log("response for commits: ", response);
                response = response.slice(0, 10);
                var commitList = Handlebars.templates.commits({
                    commits: response
                });
                console.log("sliced", commitList);
                $(e.target).append(commitList);
            } //end of the success function
        }); //end of the main ajax function
    }); //end of clicking on each item event
})(); //end and invokes iife
