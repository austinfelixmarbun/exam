using AdIns.Core.GenericApi;
using AdIns.Core.Hubs;
using AdIns.Core.Service;
using AdIns.Core.Setting;
using AdIns.Core.Transaction;

//using AdIns.Template.Interface;
//using AdIns.Template.BusinessService;
using AdIns.FPE.Encryption.Extensions;
using AdIns.License;
using AdIns.Template.API.Generic;
using AdIns.Template.BusinessService;
using AdIns.Template.BusinessService.TrObService;
using AdIns.Template.BusinessService.TransactionService;
using AdIns.Template.DataAccess.Context;
using AdIns.Template.Interface;
using AdIns.Template.Interface.TrObService;
using AdIns.Template.Interface.TransactionService;
using AdIns.Util.Redis;
using AdIns.Util.Setting;
using AdIns.Util.Workflow;
using Decor;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using System.Threading;

namespace AdIns.Template.API
{
    /// <summary>
    /// LOS Startup
    /// </summary>
    public class Startup
    {
        public IConfiguration Configuration { get; }

        /// <summary>
        /// LOS Startup Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// LOS Startup Configure Service
        /// </summary>
        /// <param name="services"></param>
        /// This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            #region Add DB Context
            string SQLConn = AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:DataBasePostgreSQL"];
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            services.AddDbContext<TemplateContext, TemplateContext>(o =>
            {
                //o.UseNpgsql(Configuration.GetConnectionString("PostgreSql:DataBasePostgreSQL"));
                o.UseLazyLoadingProxies().ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.DetachedLazyLoadingWarning)).UseNpgsql(SQLConn);
            }, ServiceLifetime.Scoped);

            #endregion

            RabbitServiceCollectionExtensions.AddRabbit(services, Configuration); //RabbitMQ aja
            services.AddControllers();

            

            #region CORS

            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                //.WithOrigins("http://localhost:4200") //set for specific origin
                .SetIsOriginAllowed(_ => true) //all origin
                .AllowCredentials();
            }));

            #endregion CORS

            #region SignalR

            services.AddSignalR().AddHubOptions<NotificationHub>(options =>
            {
                options.EnableDetailedErrors = true;
            });

            services.AddSignalR(hubOptions =>
            {
                hubOptions.HandshakeTimeout = TimeSpan.FromMinutes(1);
            });

            #endregion SignalR

            InitializeFoundation.ConfigureFoundationStartup(services);

            #region GenericAPI
            services.
    AddMvc(o => o.Conventions.Add(
        new GenericControllerRouteConvention()
    )).
    ConfigureApplicationPartManager(m =>
        m.FeatureProviders.Add(new GenericTypeControllerFeatureProvider())
    );

            services.AddTransient(typeof(IGenericApiService<>), typeof(GenericApiService<>));
            services.AddSingleton<EntityContextMapInitializer>();
            services.AddScoped<GenericApiDbContextResolver>();



            #endregion

            #region Redis
            //set to true if want to skip redis connection
            Console.WriteLine("Mulai coba Connect ke Redis");
            bool isSuccessRedis = false;
            int redisRetryLimit = 3;
            while (!isSuccessRedis)
            {
                try
                {
                    RedisService.ConfigureRedis().Wait();
                    Console.WriteLine("Berhasil Connect");
                    isSuccessRedis = true;
                }
                catch
                {
                    if (redisRetryLimit < 1)
                    {
                        Console.WriteLine("Gak Connect ke Redis");
                    }
                    Thread.Sleep(3000);
                    redisRetryLimit--;
                }
            }
            #endregion Redis

            services.AddControllersWithViews();
            services.AddFpeEncryption(Configuration);

            // populate .NET Core services
            ConfigureBusinessService(services);
        }

        /// <summary>
        /// LOS Startup Configure app ApplicationBuilder and WebHostEnvironment
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="provider"></param>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseSwagger(c =>
            {
                c.SerializeAsV2 = true;

            });

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(
            options =>
            {
                // build a swagger endpoint for each discovered API version
                for (int i = 0; i < provider.ApiVersionDescriptions.Count; i++)
                {
                    options.SwaggerEndpoint($"../swagger/{provider.ApiVersionDescriptions[i].GroupName}/swagger.json", provider.ApiVersionDescriptions[i].GroupName.ToUpperInvariant());
                }
            });

            app.UseRouting();
            app.UseCors("CorsPolicy");

            InitializeFoundation.ConfigureFoundation(app, env, provider);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCookiePolicy();

            bool useMigration = Convert.ToBoolean(AppConfiguration.AppSetting["ConnectionStrings:PostgreSql:EnableMigration"]);
            if (useMigration) UpdateDatabase(app);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/notificationHub");
            });

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                    if (exceptionHandlerPathFeature != null)
                    {
                        var exception = exceptionHandlerPathFeature.Error;
                        Console.WriteLine("Stack trace: " + exception.StackTrace);
                        Console.WriteLine("Stack trace: " + exception.Message);
                    }

                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    await context.Response.WriteAsync("Internal Server Error.");
                });
            });

        }

        /// <summary>
        /// This method gets called by the runtime. use this method to create Database from Context
        /// </summary>
        /// <param name="app"></param>
        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
            }
        }

        private static void ConfigureBusinessService(IServiceCollection services)
        {

            #region GenericAPI

            #endregion

            #region License
            services.AddTransient<LicenseManager>();
            #endregion
            // register your autofac modules


            #region Workflow
            services.AddTransient<WorkflowService>();
            services.AddTransient<NewWorkflowService>();
            #endregion

            services.AddTransient<IIntegrationService, IntegrationService>();

            services.AddTransient<IGenericService, GenericService>();

            #region Agrmnt
            services.AddTransient<IAgrmntTrObService, AgrmntTrObService>();
            services.AddTransient<IAgrmntTrService, AgrmntTrService>().AddTransient<TransactionHandler>().Decorate<IAgrmntTrService>();
            #endregion

            #region Debtor
            services.AddTransient<IDebtorTrObService, DebtorTrObService>();
            services.AddTransient<IDebtorTrService, DebtorTrService>().AddTransient<TransactionHandler>().Decorate<IDebtorTrService>();
            #endregion

            #region Payment
            services.AddTransient<IPaymentTrObService, PaymentTrObService>();
            services.AddTransient<IPaymentTrService, PaymentTrService>().AddTransient<TransactionHandler>().Decorate<IPaymentTrService>();
            #endregion

            #region Collection
            services.AddTransient<ICollectionTrObService, CollectionTrObService>();
            services.AddTransient<ICollectionTrService, CollectionTrService>().AddTransient<TransactionHandler>().Decorate<ICollectionTrService>();
            #endregion

        }
    }
}
