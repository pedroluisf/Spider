App.Dropdown = {
    container: $("#page"),
    load: function() {
        var url = "http://localhost:3000/pages";

        $.getJSON(url, function(response) {
            if (response) {
                $.each(response, function(key, value) {
                    var option = $("<option />");
                    option.val(value.id);
                    option.text(value.Title);
                    App.Dropdown.container.append(option);
                });
            }

        });
		
		/* // For local data
		$.each(App.pages, function(key, value) {
            var option = $("<option />");
            option.val(value.id);
            option.text(value.Title);
            App.Dropdown.container.append(option);
        });
		*/
    },
    attachEventHandlers: function () {
        App.Dropdown.container.on('change', function (e) {
            var valueSelected = this.value;
            App.loadData(valueSelected);
        })
    }
};
