$source = "c:\Users\vanmu\OneDrive\Desktop\PROJECTS\TERRAFIN\agrivision\src"
$dest = "c:\Users\vanmu\OneDrive\Desktop\PROJECTS\agrotech resiliance\src"

$excludeList = @(
    "app\actions\chat-hf.ts",
    "app\actions\analyze-hf.ts",
    "app\actions\crop-suggestion-hf.ts",
    "app\api\voice\synthesize\route.ts",
    "app\api\voice\transcribe\route.ts",
    "app\advisor\page.tsx",
    "components\ui\VoiceRecorder.tsx"
)

Get-ChildItem -Path $source -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($source.Length + 1)
    
    $shouldExclude = $false
    foreach ($ex in $excludeList) {
        if ($relativePath -eq $ex) {
            $shouldExclude = $true
            break
        }
    }
    
    if (-not $shouldExclude) {
        $destPath = Join-Path -Path $dest -ChildPath $relativePath
        $destDir = Split-Path -Path $destPath -Parent
        
        if (-not (Test-Path -Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        
        Copy-Item -Path $_.FullName -Destination $destPath -Force
        Write-Host "Copied: $relativePath"
    } else {
        Write-Host "Excluded: $relativePath" -ForegroundColor Yellow
    }
}
