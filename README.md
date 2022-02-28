FBTarjetas
dotnet new angular -o FBTarjeta -f netcoreapp3.1

dotnet new sln
dotnet sln add .\FBTarjeta\FBTarjeta.csproj
dotnet sln add .\Common\Common.csproj
dotnet sln add .\Models\Models.csproj