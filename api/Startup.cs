﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Octogami.LunchTracker.Api.Features.Infrastructure.Behaviors;
using Octogami.LunchTracker.Api.Features.User.GetJwt;
using Octogami.LunchTracker.Api.Infrastructure.Configuration.Crypto;
using Octogami.LunchTracker.Api.Infrastructure.Data;
using Octogami.LunchTracker.Api.Infrastructure.HttpMiddleware;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddOpenApiDocument();
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddEntityFrameworkSqlServer()
                    .AddDbContext<LunchTrackerContext>(options =>
                        options.UseSqlServer(Configuration.GetConnectionString("LunchTrackerDatabase"))
                    );

            services.Scan(scan => scan.FromAssemblyOf<Startup>()
                .AddClasses(classes => classes.AssignableTo(typeof(IValidator<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            services.AddScoped<IJwtDecoder, JwtDecoder>();
            services.Decorate<IJwtDecoder, CachingJwtDecoder>();

            var cryptoConfiguration = Configuration.GetSection("Crypto").Get<CryptoConfiguration>();
            services.AddSingleton<CryptoConfiguration>(cryptoConfiguration);

            services.AddHttpClient();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseExceptionToHttpResponseMiddleware();

            app.UseSwagger();
            app.UseSwaggerUi3();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
