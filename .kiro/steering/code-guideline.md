---
inclusion: auto
---

# Code Guideline - AdIns AR Backend

Panduan ini berlaku untuk seluruh pengembangan di repository ini (.NET 6.0).

## Arsitektur & Struktur Project

Proyek ini menggunakan **Layered Architecture** dengan pemisahan concern yang jelas:

| Layer | Project | Tanggung Jawab |
|-------|---------|----------------|
| API | `AdIns.AR.API` | Controllers, routing, middleware |
| Interface | `AdIns.AR.Interface` | Kontrak service (abstraction) |
| Business Service | `AdIns.AR.BusinessService` | Implementasi business logic |
| Data Model | `AdIns.AR.DataModel` | Entity Framework entities |
| DTO | `AdIns.AR.DTO` | Request/Response objects |
| Common | `AdIns.AR.Common` | Constants, enums, utilities |
| Core | `AdIns.AR.Core` | Helpers (FPE, encryption) |
| Batch Job | `AdIns.AR.BatchJob` | Background/scheduled jobs |

### Kategorisasi Service

Service dibagi menjadi 2 kategori berdasarkan operasinya:

- **TransactionObjectService (`TrObService`)** — Read/query operations (termasuk method `ForUpdate` untuk tracked query yang dibutuhkan TrService)
- **TransactionService (`TrService`)** — Write/transactional operations (Add, Edit, Delete). **Dilarang** melakukan query langsung ke `context.DbSet` — wajib panggil method dari TrObService.

## Konvensi Penamaan

### Classes & Interfaces

```
Controller      : {Feature}Controller              → BuyerController, VehicleController
Interface       : I{Feature}{Type}Service          → IBuyerTrService, IBuyerTrObService
Service Impl    : {Feature}{Type}Service           → BuyerTrService, BuyerTrObService
Entity          : PascalCase (sesuai tabel)        → Buyer, Vehicle, SalesTrx
Request DTO     : Req{Action}Obj / Request{Action}Obj → ReqEditBuyerObj
Response DTO    : Res{Action}Obj / Response{Action}Obj → ResponseSuccessObj
Constants       : {Module}CommonConstant           → ARCommonConstant
```

### Variables & Fields

- Private fields injected via DI: camelCase dengan prefix `i` untuk interface → `iAgrmntTrService`
- Assignment di constructor menggunakan `this.` → `this.iAgrmntTrService = iAgrmntTrService`
- Constant values: `SCREAMING_SNAKE_CASE` → `MODULE_CODE_LMS`, `STATUS_CODE_SUCCESS`
- **Dilarang menggunakan `var`** di level business service dan controller. Wajib explicit type. `var` hanya diperbolehkan di dalam clause (if, for, foreach, lambda/LINQ expression).

### File & Folder

- Controllers diorganisir dalam subfolder per feature: `Controllers/{Feature}/{Feature}Controller.cs`
- DTO dipisah per feature: `DTO/Request/{Feature}/` dan `DTO/Response/{Feature}/`
- Interface dipisah: `Interface/TrObService/`, `Interface/TransactionService/`
- BusinessService dipisah: `BusinessService/TrObService/`, `BusinessService/TransactionService/`

### Method & Route Naming (Per-Entity Controller)

- Method name dan route pada controller per-entity **harus mengandung nama entity**, bukan nama generic.
- Format: `{Action}{Entity}` → `AddBuyer`, `EditBuyer`, `DeleteBuyer`, `GetAllBuyer`, `GetBuyerById`
- Berlaku konsisten dari Controller → Interface → Service Implementation.
- Nama generic seperti `GetAll`, `Add`, `Edit`, `Delete`, `GetById` **hanya boleh** dipakai di `BaseController<T>` (generic API).

```
Controller Route & Method  : {Action}{Entity}         → GetAllBuyer, GetBuyerById, AddBuyer, EditBuyer, DeleteBuyer
Interface Method           : {Action}{Entity}         → GetAllBuyer(), AddBuyer(req)
Service Implementation     : {Action}{Entity}         → GetAllBuyer(), AddBuyer(req)
```

## Pola Controller

Setiap controller harus mengikuti pattern berikut:

```csharp
[ApiVersion("1")]
[Route("v{X-Version:apiVersion}/[controller]")]
[ApiController]
[Authorize]
[ValidateDTO]
public class FeatureController : ControllerBase
{
    #region CONSTRUCTOR
    private readonly IFeatureTrService iFeatureTrService;
    private readonly IFeatureTrObService iFeatureTrObService;

    public FeatureController(
        IFeatureTrService iFeatureTrService,
        IFeatureTrObService iFeatureTrObService) : base()
    {
        this.iFeatureTrService = iFeatureTrService;
        this.iFeatureTrObService = iFeatureTrObService;
    }
    #endregion

    #region GET
    [Route("GetAllFeature")]
    [ProducesResponseType(200, Type = typeof(ResGetAllFeatureObj))]
    [ProducesResponseType(500, Type = typeof(BaseResponseObj))]
    [HttpPost]
    [MapToApiVersion("1")]
    public async Task<JsonResult> GetAllFeature()
    {
        ResGetAllFeatureObj result = await iFeatureTrObService.GetAllFeature();
        return new JsonResult(result);
    }
    #endregion

    #region ADD UPDATE
    [Route("AddFeature")]
    [ProducesResponseType(200, Type = typeof(ResponseSuccessObj))]
    [ProducesResponseType(500, Type = typeof(BaseResponseObj))]
    [HttpPost]
    [MapToApiVersion("1")]
    public async Task<JsonResult> AddFeature(ReqAddFeatureObj requestObj)
    {
        await iFeatureTrService.AddFeature(requestObj);
        return new JsonResult(new ResponseSuccessObj());
    }
    #endregion
}
```

### Aturan Controller

- Inherit dari `ControllerBase`, bukan `Controller`
- Semua endpoint menggunakan `[HttpPost]` (termasuk operasi read)
- Gunakan `[Route("ActionName")]` di level action, bukan path template
- Selalu sertakan `[MapToApiVersion("1")]`
- Selalu sertakan `[ProducesResponseType]` untuk 200 dan 500
- Return type: `Task<ActionResult>` untuk async operations
- Response: `new JsonResult(new ResponseSuccessObj())` atau custom response DTO
- Gunakan `#region` untuk mengelompokkan kode: CONSTRUCTOR, ADD UPDATE, GET, dll.
- Tambahkan XML doc comments (`///`) pada public members

## Pola Service & Business Logic

### TrService Implementation (Transaction/Write)

```csharp
public class FeatureTrService : BaseService, IFeatureTrService
{
    #region Constructor
    private readonly IRepository repository;
    private readonly IFeatureTrObService iFeatureTrObService;

    public FeatureTrService(
        TemplateContext context,
        IHttpContextAccessor httpContextAccessor,
        Func<BaseDbContext, IRepository> repository,
        IFeatureTrObService iFeatureTrObService) : base(httpContextAccessor)
    {
        this.repository = repository(context);
        this.iFeatureTrObService = iFeatureTrObService;
    }
    #endregion

    #region ADD
    public virtual async Task AddFeature(ReqAddFeatureObj req)
    {
        Feature entity = new Feature { ... };
        repository.Add(entity);
        await repository.SaveChangesAsync();
    }
    #endregion

    #region EDIT
    public virtual async Task EditFeature(ReqEditFeatureObj req)
    {
        // Query via TrObService (tracked, tanpa AsNoTracking)
        Feature entity = await iFeatureTrObService.GetFeatureForUpdate(req.FeatureId);

        if (entity == null)
        {
            string[] arr = { "Feature" };
            throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
        }

        entity.PropertyName = req.PropertyName;
        await repository.SaveChangesAsync();
    }
    #endregion
}
```

### TrObService Implementation (Read/Query)

```csharp
public class FeatureTrObService : BaseService, IFeatureTrObService
{
    #region Constructor
    private readonly TemplateContext context;

    public FeatureTrObService(
        TemplateContext context,
        IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
        this.context = context;
    }
    #endregion

    #region GET
    public virtual async Task<ResGetAllFeatureObj> GetAllFeature()
    {
        List<Feature> list = await context.Feature.AsNoTracking().ToListAsync();
        // Map to response DTO...
    }
    #endregion

    #region FOR UPDATE
    public virtual async Task<Feature> GetFeatureForUpdate(long featureId)
    {
        // TANPA AsNoTracking — entity tracked untuk update di TrService
        Feature entity = await context.Feature
            .FirstOrDefaultAsync(x => x.FeatureId == featureId);
        return entity;
    }
    #endregion
}
```

### Aturan Service

- Inherit dari `BaseService`
- Method menggunakan `virtual async Task<T>` pattern
- Error handling menggunakan `AdInsCustomException` dengan key dari `ExceptionConstant` (lihat section Error Handling)
- Gunakan `#region` untuk Constructor dan grouping logic
- **TrService dilarang query langsung ke `context.DbSet`** — wajib panggil method dari TrObService
- TrObService menyediakan 2 jenis method:
  - **Get biasa** (`AsNoTracking`) — untuk response ke client
  - **GetForUpdate** (tanpa `AsNoTracking`, tracked) — untuk kebutuhan edit/delete di TrService

### Repository Pattern & Transaction (Transaction Service)

- Transaction service **wajib** inject `Func<BaseDbContext, IRepository> repository` di constructor
- Assign di constructor: `this.repository = repository(context)`
- **Semua operasi write (Add, Edit, Delete) wajib melalui `repository`**, bukan langsung ke `context`
- **TrService dilarang query langsung ke `context.DbSet`** — semua query harus melalui TrObService
- Untuk kebutuhan edit/delete: panggil `Get{Entity}ForUpdate()` dari TrObService (entity tracked, siap di-update)
- Untuk kebutuhan validasi read-only di TrService: panggil method dari TrObService yang relevan
- TrObService (read-only) **tidak perlu** inject `IRepository`, cukup pakai `context.DbSet`
  - Method Get biasa: pakai `AsNoTracking()`
  - Method ForUpdate: **tanpa** `AsNoTracking()` agar entity tracked
- **Jangan isi `UsrCrt`/`DtmCrt`/`UsrUpd`/`DtmUpd` secara manual** — repository/TransactionHandler mengisi audit fields secara otomatis

#### `IRepository` API (dari `AdIns.DataAccess`):

| Method | Kegunaan |
|--------|----------|
| `void Add(object obj)` | Insert entity baru |
| `Task AddAsync(object obj)` | Insert entity baru (async) |
| `void AddRange(List<object> objs)` | Insert multiple entities |
| `Task AddRangeAsync(List<object> objs)` | Insert multiple entities (async) |
| `void Remove(object obj)` | Delete entity |
| `void RemoveRange(List<object> objs)` | Delete multiple entities |
| `int SaveChanges()` | Persist changes (sync) |
| `Task<int> SaveChangesAsync()` | Persist changes (async) |
| `object FindByPrimaryKey(Type objectType, long id)` | Cari entity by PK |
| `void RefreshContext(object obj)` | Refresh entity state dari DB |

#### Aturan penggunaan:
- **Insert**: `repository.Add(entity)` atau `repository.AddRange(list)`
- **Update**: Query entity dari `context` (tracked), ubah property, lalu `await repository.SaveChangesAsync()`
- **Delete**: `repository.Remove(entity)` atau `repository.RemoveRange(list)`, lalu `await repository.SaveChangesAsync()`
- **Dilarang** pakai `context.DbSet.Add()`, `context.DbSet.Remove()`, atau `context.SaveChangesAsync()` di transaction service

## Dependency Injection

### Registrasi di Startup.cs

```csharp
// TrObService (read/query, tanpa decorator)
services.AddTransient<IFeatureTrObService, FeatureTrObService>();

// Transaction service (dengan TransactionHandler decorator)
services.AddTransient<IFeatureTrService, FeatureTrService>()
    .AddTransient<TransactionHandler>()
    .Decorate<IFeatureTrService>();

// Service dengan caching
services.AddTransient<IFeatureService, FeatureService>()
    .AddTransient<CacheHandler>()
    .Decorate<IFeatureService>();
```

### ⚠️ WAJIB: Atribut `[Decorate(typeof(TransactionHandler))]` pada Method Transaksional

**Registrasi di Startup.cs TIDAK CUKUP.** Setiap method di TrService yang melakukan operasi write (memanggil `SaveChanges()` atau `SaveChangesAsync()`) **WAJIB** diberi atribut `[Decorate(typeof(TransactionHandler))]`.

Atribut ini diperlukan agar Decor library tahu method mana yang harus dibungkus oleh `TransactionHandler` (begin transaction, commit/rollback). Tanpa atribut ini, meskipun DI decorator sudah terdaftar, **method tidak akan berjalan dalam transaction scope**.

#### Aturan:
- Tambahkan `using Decor;` dan `using AdIns.Core.Transaction;` di setiap TrService
- Pasang `[Decorate(typeof(TransactionHandler))]` di **setiap** `virtual` method yang memiliki `SaveChanges()` atau `SaveChangesAsync()`
- Method **HARUS** `virtual` agar decorator proxy bisa intercept

#### Contoh:

```csharp
using Decor;
using AdIns.Core.Transaction;

public class FeatureTrService : BaseService, IFeatureTrService
{
    // ... constructor ...

    [Decorate(typeof(TransactionHandler))]
    public virtual async Task AddFeature(ReqAddFeatureObj req)
    {
        Feature entity = new Feature { ... };
        repository.Add(entity);
        await repository.SaveChangesAsync();
    }

    [Decorate(typeof(TransactionHandler))]
    public virtual async Task EditFeature(ReqEditFeatureObj req)
    {
        Feature entity = await iFeatureTrObService.GetFeatureForUpdate(req.FeatureId);
        entity.PropertyName = req.PropertyName;
        await repository.SaveChangesAsync();
    }
}
```

#### Checklist:
- ✅ DI di Startup.cs: `.AddTransient<TransactionHandler>().Decorate<IFeatureTrService>()`
- ✅ Atribut di method: `[Decorate(typeof(TransactionHandler))]`
- ✅ Method harus `virtual`
- ✅ Import: `using Decor;` dan `using AdIns.Core.Transaction;`

### Aturan DI

- Gunakan `AddTransient` untuk semua service registration
- `TransactionHandler` decorator untuk service yang melakukan write operations
- `CacheHandler` decorator untuk service yang membutuhkan caching
- Kelompokkan registrasi dengan `#region` berdasarkan feature/domain

## Data Access & Entity

### Entity Pattern

```csharp
[Table("TABLE_NAME")]
[GeneratedController("v1/EntityObj")]
public class EntityName : BaseEntity
{
    [Key]
    [Column("ENTITY_ID")]
    public long EntityId { get; set; }

    [Required]
    [Column("COLUMN_NAME")]
    [StringLength(100)]
    public string PropertyName { get; set; }
}
```

### Aturan Data Access

- Database column: `SCREAMING_SNAKE_CASE` → C# property: `PascalCase`
- Gunakan Data Annotations: `[Table]`, `[Column]`, `[Key]`, `[Required]`, `[StringLength]`, `[ForeignKey]`
- EF Core untuk standard CRUD, LinqToDB untuk complex queries
- Gunakan `AsNoTracking()` untuk read-only queries
- Stored procedures via `DBHelper.ExecuteDataset`
- Multi-database support: SQL Server dan PostgreSQL (runtime switch)

## DTO Pattern

### Request DTO

```csharp
public class RequestFeatureActionObj : BaseRequestObj
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "Field cannot be null.")]
    public string FieldName { get; set; }

    public DateTime? OptionalDate { get; set; }
}
```

### Response DTO

- Gunakan `ResponseSuccessObj` untuk success tanpa data (Add, Edit, Delete)
- Gunakan custom `Res{Feature}Obj` untuk response dengan data (Get)
- Semua Response DTO yang berisi data **wajib** extend `BaseResponseObj`
- Error menggunakan `BaseResponseObj` dengan status code 500
- Response DTO **dibangun di service layer** — controller hanya terima dan return
- Response DTO ditaruh di `DTO/Response/{Feature}/`
- Controller return type: `Task<JsonResult>` (bukan `Task<ActionResult>`)

```csharp
// Contoh Response DTO (berisi data)
public class ResGetAllVehicleObj : BaseResponseObj
{
    public List<ResVehicleDetailObj> VehicleList { get; set; }
}

// Contoh di Controller
public async Task<JsonResult> GetAllVehicle()
{
    ResGetAllVehicleObj result = await iVehicleTrObService.GetAllVehicle();
    return new JsonResult(result);
}
```

### Aturan DTO

- Request DTO selalu extend `BaseRequestObj`
- Validasi menggunakan Data Annotations: `[Required]`, `[StringLength]`, `[Range]`
- Error message harus deskriptif
- Nullable types (`?`) untuk optional fields

## Error Handling

### Pattern: ExceptionConstant + errormessages.json

Exception di project ini menggunakan centralized error message registry:

1. **Definisikan constant key** di `ExceptionConstant.cs` (project Common)
2. **Daftarkan message** di `errormessages.json` (project API) dengan key yang sama
3. **Throw exception** menggunakan key dari `ExceptionConstant`

#### 1. ExceptionConstant.cs

File: `AdIns.Template.Common/ExceptionConstant.cs`

```csharp
public static class ExceptionConstant
{
    public const string DATA_NOT_FOUND = "DATA_NOT_FOUND";
    public const string DUPL_USER_NAME = "DUPL_USER_NAME";
    public const string DUPL_CODE = "DUPL_CODE";
}
```

- Naming: `SCREAMING_SNAKE_CASE`
- Value string **harus sama persis** dengan key di `errormessages.json`
- Tambahkan constant baru di sini setiap kali ada error message baru

#### 2. errormessages.json

File: `AdIns.Template.API/errormessages.json`

```json
{
  "ErrorList": {
    "DATA_NOT_FOUND": {
      "ErrorCode": "404",
      "ErrorMessage": "{0} Not Found"
    },
    "DUPL_USER_NAME": {
      "ErrorCode": "400",
      "ErrorMessage": "Username {0} sudah digunakan"
    },
    "DUPL_CODE": {
      "ErrorCode": "400",
      "ErrorMessage": "Code {0} sudah terdaftar"
    }
  }
}
```

- `ErrorCode`: HTTP status code yang akan dikembalikan
- `ErrorMessage`: Message template, bisa pakai placeholder `{0}`, `{1}`, dst.

#### 3. Cara Throw Exception

```csharp
// Tanpa parameter placeholder
throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND);

// Dengan parameter placeholder (mengisi {0}, {1}, dst.)
string[] arr = { "Buyer" };
throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND, arr);
// Hasil: ErrorCode = "404", Message = "Buyer Not Found"
```

- Constructor `(string key)` — resolve dari `errormessages.json`, tanpa placeholder
- Constructor `(string key, string[] params)` — resolve dari `errormessages.json`, placeholder `{0}`, `{1}` diisi dari array
- Constructor `(string statusCode, string message)` — hardcode langsung (**HINDARI**, hanya untuk kasus legacy)

### Aturan Exception

- **Dilarang hardcode message** langsung di `AdInsCustomException` — wajib pakai key dari `ExceptionConstant`
- **Dilarang hardcode status code** ("400", "500") di throw — `ErrorCode` sudah didefinisikan di `errormessages.json`
- Setiap error baru: tambah constant di `ExceptionConstant.cs` → daftarkan di `errormessages.json` → throw pakai constant
- Validasi input level DTO tetap via `[ValidateDTO]` filter
- Jangan catch generic `Exception` kecuali di top-level handler

## Teknologi & Library

| Concern | Library |
|---------|---------|
| Framework | .NET 6.0 |
| ORM | Entity Framework Core 7.x + LinqToDB 6.x |
| Serialization | Newtonsoft.Json (bukan System.Text.Json) |
| Logging | NLog |
| Auth | JWT Bearer + OpenID Connect |
| Cache | Redis (StackExchange.Redis) |
| Queue | RabbitMQ |
| Workflow | Camunda |
| Metrics | Prometheus |
| API Docs | Swagger/OpenAPI |
| Encryption | FPE (Format-Preserving Encryption) |

## Versioning API

- Gunakan `[ApiVersion("1")]` di class level
- Route pattern: `v{X-Version:apiVersion}/[controller]`
- Gunakan `[MapToApiVersion("1")]` di setiap action
- Multiple versions di satu controller: `[ApiVersion("1")]`, `[ApiVersion("2")]`, dll.

## Constant & Magic Values

- Jangan gunakan magic strings/numbers di code
- Definisikan constants di `ARCommonConstant` atau class constant yang sesuai
- Gunakan `#region` untuk grouping constants berdasarkan kategori
- Naming: `SCREAMING_SNAKE_CASE` untuk constant values

## Best Practices Tambahan

1. **Async/Await** — Gunakan `async/await` untuk semua I/O operations
2. **Transaction** — Gunakan `TransactionHandler` decorator, bukan manual transaction management
3. **Logging** — Gunakan NLog, jangan `Console.WriteLine` di production code
4. **Null Safety** — `.editorconfig` mematikan CS8600, tapi tetap validasi null di business logic
5. **Region** — Gunakan `#region` untuk organisasi code sections (Constructor, methods by category)
6. **XML Comments** — Tambahkan XML doc comments pada public API members
7. **Generic API** — Gunakan `IGenericApiService<T>` untuk operasi CRUD standar pada entity
8. **Idempotency** — Gunakan `[IdempotentValidation]` untuk endpoint yang memerlukan idempotency
