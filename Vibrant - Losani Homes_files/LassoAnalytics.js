(function () {

    var LassoAnalytics = window.LassoAnalytics = function (accountId) {
        if (!accountId) {
            throw ('LassoAnalytics: AccountId is undefined.');
        }
        this.accountId = accountId;
        this.namespace = '_ldst';
        this.tokenKey = 'ldstok';
        this.divId = this.namespace + 'div';
        this.trackingDomain = 'http://lasso-analytics.com';
        this.now = new Date();

        this.pageReferer = null;
        this.pageTitle = null;
        this.pageUrl = null;
        this.guid = null;
        this.isNewVisitor = 0;
        this.isNewDailyVisitor = false;
        this.isNewWeeklyVisitor = false;
        this.isNewMonthlyVisitor = false;
    };

    LassoAnalytics.prototype = {
        init: function () {

            this.imgSrc = this.trackingDomain + '/' + this.namespace + '.gif';

            var div = document.createElement('div');
            div.setAttribute('id', this.divId);
            div.setAttribute('style', 'display:none');
            document.body.appendChild(div);

            return this;
        },


        track: function (options) {
            try {
                var div = document.getElementById(this.divId);

                this.pageReferer = this.pageReferer == null ? "" + document.referrer : this.pageReferer;
                this.pageTitle = this.pageTitle == null ? "" + document.title : this.pageTitle;

                this.pageUrl = document.location.protocol
                    + '//'
                    + (options && options.hostname ? options.hostname : document.location.hostname)
                    + (document.location.port ? ':' + document.location.port : '')
                    + document.location.pathname
                    + document.location.search;

                if (options && options.pageTitle) {
                    this.pageTitle = options.pageTitle;
                }

                this.setupCookies();

                var trackingUrl = (this.imgSrc + '?' + this.generateQueryString()).replace(/'/g, '%27');
                div.innerHTML = '<img src="' + trackingUrl + '" border="0" width="0" height="0" />';
            }
            catch (e) {
                throw ('LassoAnalytics: failed to execute track().', e);
            }
        },

        generateQueryString: function () {
            var query = '';
            query += "accountId=" + encodeURIComponent(this.accountId);
            query += "&guid=" + encodeURIComponent(this.guid);
            query += "&newVisitor=" + this.isNewVisitor;
            query += "&pageUrl=" + encodeURIComponent(this.pageUrl.replace(/\.{2}/g, ''));
            query += "&pageReferer=" + encodeURIComponent(this.pageReferer.replace(/\.{2}/g, ''));
            query += "&pageTitle=" + encodeURIComponent(this.pageTitle.replace(/\.{2}/g, ''));
            query += "&localTime=" + this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate() + ' ';
            query += this.now.getHours() + ':' + this.now.getMinutes() + ':00';

            query += this.processToken();

            if (this.isNewDailyVisitor) {
                query += "&newDailyVisitor=1";
            }
            if (this.isNewWeeklyVisitor) {
                query += "&newWeeklyVisitor=1";
            }
            if (this.isNewMonthlyVisitor) {
                query += "&newMonthlyVisitor=1";
            }
            return query;
        },

        processToken: function () {
            var token = '';
            if (location.search.length != 0) {
                var qs = location.search.substr(1).split("&");
                for (var i = 0; i < qs.length; i++) {
                    var hash = qs[i].split("=");
                    if (hash[0] == this.tokenKey) {
                        return '&' + this.tokenKey + '=' + hash[1];
                    }
                }
            }
            return token;
        },

        setupCookies: function () {
            this.guid = this.readCookie("ut");
            if (!this.guid) {
                this.guid = this.getGuid();
                var expires = 60 * 60 * 24 * 3650; // ~10 Years
                this.writeCookie("ut", this.guid, expires);
                this.guid = this.readCookie("ut"); // test for cookie
                this.isNewVisitor = 1;
            }

            //Periodical cookies
            if (!this.readCookie("ud")) {
                this.writeCookie("ud", this.guid, this.secondsUntilEndOfDay());
                this.isNewDailyVisitor = true;
            }

            if (!this.readCookie("uw")) {
                this.writeCookie("uw", this.guid, this.secondsUntilEndOfWeek());
                this.isNewWeeklyVisitor = true;
            }
            if (!this.readCookie("um")) {
                this.writeCookie("um", this.guid, this.secondsUntilEndOfMonth());
                this.isNewMonthlyVisitor = true;
            }
        },

        writeCookie: function (name, value, expireSeconds) {
            name = this.namespace + name;
            var expireDate = this.now;
            expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
            document.cookie = name + "=" + escape(value) + ((expireSeconds == null) ? "" : ";path=/;expires=" + expireDate.toGMTString());
        },

        readCookie: function (name) {
            name = this.namespace + name;
            if (document.cookie.length > 0) {
                var start = document.cookie.indexOf(name + "=");
                if (start != -1) {
                    start = start + name.length + 1
                    end = document.cookie.indexOf(";", start)
                    if (end == -1) {
                        end = document.cookie.length
                    }
                    return unescape(document.cookie.substring(start, end))
                }
            }
            return null
        },

        secondsBetween: function (date1, date2) {
            var difference = Math.abs(date1.getTime() - date2.getTime());
            return Math.round(difference / 1000);
        },

        secondsUntilEndOfDay: function () {
            var endOfDay = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 23, 59, 59);
            return this.secondsBetween(this.now, endOfDay);
        },

        secondsUntilEndOfWeek: function () {
            var endOfWeek = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + (7 - this.now.getDay()), 23, 59, 59);
            return this.secondsBetween(this.now, endOfWeek);
        },

        secondsUntilEndOfMonth: function () {
            var endOfMonth = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0);
            return this.secondsBetween(this.now, endOfMonth);
        },

        getGuid: function () {
            var i,
                c = "89ab",
                u = [];
            for (i = 0; i < 36; i += 1) {
                u[i] = (Math.random() * 16 | 0).toString(16);
            }
            u[8] = u[13] = u[18] = u[23] = "-";
            u[14] = "4";
            u[19] = c.charAt(Math.random() * 4 | 0);
            return u.join("").toUpperCase();
        },

        /*
         * The following methods need to be called before self::init()
         */
        setTrackingDomain: function (domain) {
            this.trackingDomain = domain;
        },

        setPageTitle: function (title) {
            this.pageTitle = title;
        },

        patchRegistrationForms: function (guidFormField) {
            guidFormField = guidFormField || 'guid';

            var this_ = this;
            document.addEventListener("DOMContentLoaded", function (event) {
                for (var i = 0; i < document.forms.length; i++) {
                    if (document.forms[i][guidFormField] != undefined) {
                        document.forms[i][guidFormField].value = this_.readCookie("ut");
                    }
                };
            });
        }
    };

    if (typeof module !== 'undefined') {
        module.exports = LassoAnalytics;
    }
})();