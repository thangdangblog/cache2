const KEY_INFOR = "info";

document.addEventListener("DOMContentLoaded", function () {

    const MISASessionStorage = new MISASessionStorageObject();

    const initCode = function () {
        // Kiểm tra xem có thông tin trong LocalStorage không = phương thức Get

        // Lấy dữ liệu
        let dataLocal = MISASessionStorage.get(KEY_INFOR);

        if (dataLocal) {

            dataLocal = JSON.parse(dataLocal);

            $(".company").text(dataLocal.CompanyName);
            $(".fullname").text(dataLocal.FullName);
            $(".user-code").text(dataLocal.UserCode);
            $(".phone-number").text(dataLocal.PhoneNumber);

            $(".logouted").addClass("hide");
            $(".logined").removeClass("hide");

        } else {
            $(".logouted").removeClass("hide");
            $(".logined").addClass("hide");
        }
    }



    // Xử lý đăng xuất
    $(".btn-logout").click(() => {
        // Thực hiện xóa key KEY_INFOR
        MISASessionStorage.remove(KEY_INFOR);
        
        // hoặc có thể dùng ClearAll để xóa tất cả
        // MISASessionStorage.clearAll();

        $(".logouted").removeClass("hide");
        $(".logined").addClass("hide");
    })

    // Thực hiện đăng nhập
    $(".btn-login").click(() => {
        var username = "";
        var password = "";
        username = $(".username").val();
        password = $(".password").val();

        var request = $.ajax({
            url: `https://localhost:7037/User/login?username=${username}&password=${password}`,
            method: "GET",
        });

        request.done(function (msg) {

            if (msg && msg.Success && msg.Data) {
                toastr.success('Đăng nhập thành công!', 'Thông báo');
                $(".company").text(msg.Data.CompanyName);
                $(".fullname").text(msg.Data.FullName);
                $(".user-code").text(msg.Data.UserCode);
                $(".phone-number").text(msg.Data.PhoneNumber);

                // Lưu thông tin vào Local Storage
                MISASessionStorage.set(KEY_INFOR, JSON.stringify(msg.Data));

                $(".logouted").addClass("hide");
                $(".logined").removeClass("hide");


            } else {
                toastr.error('Đăng nhập thất bại!', 'Thông báo')
            }

        });

        request.fail(function (jqXHR, textStatus) {
            toastr.error('Đăng nhập thất bại!', 'Thông báo')
        });

    })


    // Chạy khởi tạo
    initCode();

});


const MISASessionStorageObject = function (prefix = "MISA") {

    // Lấy Key theo format
    this.getKey = function (key) {
        return `${prefix}_${key}`;
    }

    /**
     * Lấy dữ liệu
     */
    this.get = function (key) {
        return window.sessionStorage.getItem(this.getKey(key));
    }

    /**
     * Lấy dữ liệu
     */
    this.set = function (key, value) {
        return window.sessionStorage.setItem(this.getKey(key), value);
    }

    /**
     * Xóa dữ liệu
     */
    this.remove = function (key) {
        return window.sessionStorage.removeItem(this.getKey(key));
    }

    /**
     * Xóa toàn bộ dữ liệu
     */
    this.clearAll = function () {
        return window.sessionStorage.clear();
    }
}





toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}