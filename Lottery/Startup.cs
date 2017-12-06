using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Lottery.Startup))]
namespace Lottery
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
