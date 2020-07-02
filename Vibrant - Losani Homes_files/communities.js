$(document).ready(function () {

    var isPronto = false;

    if (typeof getUrlVars()["pronto"] != 'undefined') {

        isPronto = true;

        $(".filterPronto").addClass("selected");
        $(".filterNewBuild").removeClass("selected");

    }

    console.log("Here");

    console.log(isPronto);

    function i(i, e, t, a, o, s, js) {
        if (i == "mckenzie-ad") {
            i = "the-mckenzie-caledonia";
        }
        var c = {
            id: i,
            price: e,
            type: t,
            sqft: a,
            beds: o,
            baths: s,
            pronto: js
        };
        $.ajax({
            url: "/api/HomesAPI",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            traditional: !0,
            success: function (i) {
                console.log(i);
                i.length > 0 && $(".inventory-search-button").show();
                var e = "";
                0 == i.length ? e += "<h1>No product matches your search.</h1>" : $.each(i, function (i, t) {
                    console.log(t);
                    e += '<div class="col-md-4">', e += '<div class="col-md-12">';
                    if (t.isPronto == true) {
                        //e += '<div class="image-container" style="background: url(' + t.renderingThumbnails + ') no-repeat center; background-size: ' + (t.lotName == 'Custom' || t.ModelRenderingStyleId == 3 && t.lotNumber && t.lotNumber != '0' ? 'contain' : 'cover') + ';"><img src="/Images/pronto-logo.png" /></div>';
                        e += '<div class="image-container" style="background: url(' + t.renderingThumbnails + ') no-repeat center; background-size: ' + (t.lotName == 'Custom' || t.ModelRenderingStyleId == 3 ? 'contain' : 'cover') + ';"><img src="/Images/pronto-logo.png" /></div>';
                    }
                    else {
                        //e += '<div class="image-container" style="background: url(' + t.renderingThumbnails + ') no-repeat center; background-size: ' + (t.lotName == 'Custom' || t.ModelRenderingStyleId == 3 && t.lotNumber && t.lotNumber != '0' ? 'contain' : 'cover') + ';"></div>';
                        e += '<div class="image-container" style="background: url(' + t.renderingThumbnails + ') no-repeat center; background-size: ' + (t.lotName == 'Custom' || t.ModelRenderingStyleId == 3 ? 'contain' : 'cover') + ';"></div>';
                    }
                    e += "<h1>" + t.name + "</h1>";
                    e += 0 == t.price ? "<h2>Coming Soon</h2>" : 1 == t.isPronto ? "<h2>$" + n(t.price) + "</h2>" : "<h2>from $" + n(t.price) + "</h2>";
                    e += (t.lotNumber && t.lotNumber != '0' ? "<h3>Lot Number " + t.lotNumber + "</h3>" : "");
                    e += ((!t.lotNumber || t.lotNumber == '0') && t.canDisplayLotName ? "<h3>" + t.lotName + "</h3>" : (t.lotNumber && t.lotNumber != '0' ? "" : "<h3>&nbsp;</h3>"));
                    e += '<div class="inventory-info row">';
                    e += 0 == t.sqftmax ? '<div class="col-md-4"><img src="/Images/icons/ruler-icon.png" class="icons" alt="Sq.ft." />' + t.sqftmin + " sq.ft.</div>" : '<div class="col-md-4"><img src="/Images/icons/ruler-icon.png" class="icons" alt="Sq.ft." />' + t.sqftmin + " &ndash; " + t.sqftmax + " sq.ft.</div>";
                    e += t.bedmin == t.bedmax ? '<div class="col-md-4"><img src="/Images/icons/bed-icon.png" class="icons" alt="Bed" /> ' + t.bedmin + "</div>" : '<div class="col-md-4"><img src="/Images/icons/bed-icon.png" class="icons" alt="Bed" /> ' + t.bedmin + " &ndash; " + t.bedmax + "</div>";
                    e += parseFloat(t.bathmin) == parseFloat(t.bathmax) ? '<div class="col-md-4"><img src="/Images/icons/bath-icon.png" class="icons" alt="Bath" /> ' + t.bathmin + "</div>" : '<div class="col-md-4"><img src="/Images/icons/bath-icon.png" class="icons" alt="Bath" /> ' + t.bathmin + " &ndash; " + t.bathmax + "</div>";
                    e += "</div>", e += "</div>";
                    e += '<a href="/communities/' + t.communitySlug + '/models/' + t.modelSlug + '/' + t.id + '">View Details</a>', e += "</div>";
                }), $(".inventory").html(e)
            }
        });
        var apiToken = "";
      
    }

    function e(i) {
        return i
    }

    function n(i) {
        x = (i += "").split("."), x1 = x[0], x2 = x.length > 1 ? "." + x[1] : "";
        for (var e = /(\d+)(\d{3})/; e.test(x1);) x1 = x1.replace(e, "$1,$2");
        return x1 + x2
    }
    var t, a = [],
        o = [],
        s = [],
        c = [],
        r = [],
        js = false;
    $(window).width() >= 1200 && $(".dropdown").hover(function () {
        $(this).addClass("open")
    }, function () {
        $(this).removeClass("open")
    });
    /*$(".navbar-toggle, .dropdown-toggle").on("click", function () {
        clearInterval(t), t = setInterval(function () {
            $(".collapse").hasClass("in") && $(".collapse").removeClass("in")
        }, 5e3)
    });*/
    var d = $(".navbar").height();
    $(window).resize(function () {
        d = $(".navbar").height()
    }), $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var i = $(this.hash);
                if ((i = i.length ? i : $("[name=" + this.hash.slice(1) + "]")).length) return $("html, body").animate({
                    scrollTop: i.offset().top - d
                }, 1e3), !1
            }
        })
            })
            //, $(".address-bar").sticky({
    //    topSpacing: 80
            //    })
            , i(e(window.location.pathname.split("/"))[2], a, o, s, c, r, isPronto), $(".filterInventory").on("click", function () {
        return $(".inventory-search").toggle(), $(".filterInventory img").toggle(), !1
    }), $("#communities .inventory-search button.dropdown-toggle").on("click", function () {
        $("img", this).toggle()
    }), $("ul.dropdown-menu input[type=checkbox]").each(function () {
        $(this).change(function () {
            "price" == $(this).attr("id") ? this.checked ? a.push($(this).val()) : a = a.filter(function (i) {
                return i !== $(this).val()
            }, this) : "type" == $(this).attr("id") ? this.checked ? o.push($(this).val()) : o = o.filter(function (i) {
                return i !== $(this).val()
            }, this) : "sqft" == $(this).attr("id") ? this.checked ? s.push($(this).val()) : s = s.filter(function (i) {
                return i !== $(this).val()
            }, this) : "bedrooms" == $(this).attr("id") ? this.checked ? c.push($(this).val()) : c = c.filter(function (i) {
                return i !== $(this).val()
            }, this) : "bathrooms" == $(this).attr("id") && (this.checked ? r.push($(this).val()) : r = r.filter(function (i) {
                return i !== $(this).val()
                            }, this)), i(e(window.location.pathname.split("/"))[2], a, o, s, c, r, isPronto)
        })
    }), $(".community-contact").on("click", function () {
        return $(".community-form").toggle(), !1
    }), $("#woodlands-form").submit(function (i) {
        var e = grecaptcha.getResponse();
        return 0 == e.length ? (document.getElementById("captcha-woodlands").innerHTML = "You can't leave Captcha Code empty", !1) : 0 != e.length ? (document.getElementById("captcha-woodlands").innerHTML = "Captcha completed", !0) : void 0
    }), $("#fallingwaters-form").submit(function (i) {
        var e = grecaptcha.getResponse();
        return 0 == e.length ? (document.getElementById("captcha-fallingwaters").innerHTML = "You can't leave Captcha Code empty", !1) : 0 != e.length ? (document.getElementById("captcha-fallingwaters").innerHTML = "Captcha completed", !0) : void 0
        });


    $(".filterNewBuild").on("click", function () {

        i(e(window.location.pathname.split("/"))[2], a, o, s, c, r, false);

        js = false;

        $(this).addClass("selected");
        $(".filterPronto").removeClass("selected");

        return false;

    });

    $(".filterPronto").on("click", function () {

        i(e(window.location.pathname.split("/"))[2], a, o, s, c, r, true);

        js = true;

        $(this).addClass("selected");
        $(".filterNewBuild").removeClass("selected");

        return false;

    });

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }


    $("#lasso-registration-form-community").submit(function (n) {

        $("input[name=subscribe]").attr('disabled', 'disabled');

        var t = grecaptcha.getResponse();

        if (t.length != 0) {

            $('input[type=checkbox]').each(function (x, y) {

                console.log(x);
                console.log(y);

            });


            document.getElementById("captcha-lasso").innerHTML = "Captcha completed";
        }
        else {

            n.preventDefault();

            $("input[name=subscribe]").removeAttr("disabled");

            document.getElementById("captcha-lasso").innerHTML = "You can't leave Captcha Code empty";
        }

        return false;

    });

    $("#lasso-registration-form").submit(function (n) {

        $("input[name=subscribe]").attr('disabled', 'disabled');

        var t = grecaptcha.getResponse();

        if (t.length != 0) {

            document.getElementById("captcha-lasso").innerHTML = "Captcha completed";

            $.ajax({
                url: "/api/Lasso",
                data: $('#lasso-registration-form').serialize(),
                method: "POST",
                success: function (i) {

                    if ($('select#Realtor').val() == "206757") {

                        $("input[name='SignupThankyouLink']").val("/realtor/");

                    }

                    location = $("input[name='SignupThankyouLink']").val();

                }
            });

        }
        else {

            n.preventDefault();

            $("input[name=subscribe]").removeAttr("disabled");

            document.getElementById("captcha-lasso").innerHTML = "You can't leave Captcha Code empty";
        }

        return false;

    });

});