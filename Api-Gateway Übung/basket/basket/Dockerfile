FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore basket.csproj

# copy everything else and build app
COPY . ./
RUN dotnet publish basket.csproj -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:3.0.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "basket.dll"]