using Microsoft.AspNetCore.Mvc;

namespace DemoCache.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private Information information = new Information()
        {
            CompanyName = "Công ty cổ phần MISA",
            TenantID = new Guid("90ca0830-615d-4d4f-a9e7-f73a3963ab8f"),
            UserName = "customize",
            UserCode = "customize",
            FullName = "Mẫn Tuấn Phong",
            PhoneNumber = "0984923456",
        };

        [HttpGet("login")]
        public ServiceActionResult<Information> Login(string username, string password)
        {
            ServiceActionResult<Information> result = new ServiceActionResult<Information>();
            if (username == "customize" && password == "12345678@Abc")
            {
                result.Success = true;
                result.Data = information;
            }
            
            return result;
        }

        [HttpGet("getInfo")]
        public ServiceActionResult<Information> Infor()
        {
            ServiceActionResult<Information> result = new ServiceActionResult<Information>();
            result.Success = true;
            result.Data = information;

            return result;
        }
    }


    public class ServiceActionResult<T>
    {
        public bool Success { get; set; }

        public T Data { get; set; }
    }

    public class Information
    {
        public Guid TenantID { get; set; }
        public string CompanyName { get; set; }
        public string UserName { get; set; }
        public string UserCode { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
