// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use std::path::Path;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_file,
            write_file,
            rename_file,
            check_file,
            delete_file,
            new_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
async fn open_file(path: String) -> Result<String, ()> {
    let file = fs::read_to_string(path).expect("error while reading file");
    println!("open_file {:?}", file);
    Ok(file)
}
#[tauri::command]
async fn write_file(path: String, text: String) -> Result<String, ()> {
    // write file
    println!("write: path: {} \n text: {}", path, text);
    let _ = fs::write(path, text);

    Ok("File saved!".to_string())
}
#[tauri::command]
async fn rename_file(path: String, name: String) -> Result<String, ()> {
    // rename file
    println!("rename: path: {} \n name: {}", path, name);
    let _ = fs::rename(path, name);

    Ok("File renamed!".to_string())
}

#[tauri::command]
async fn delete_file(path: String) -> Result<String, ()> {
    // delte file
    println!("delete: path: {}", path);
    let _ = fs::remove_file(path);

    Ok("File deleted!".to_string())
}

#[tauri::command]
async fn new_file(path: String) -> Result<String, ()> {
    // new file
    println!("delete: path: {}", path);
    let _ = fs::create_dir(path);

    Ok("File deleted!".to_string())
}

#[tauri::command]
async fn check_file(path: String) -> Result<bool, ()> {
    // checks if file exists
    let exists = Path::new(&path).exists();
    println!("check: path: {}, exists: {}", path, exists);

    Ok(exists)
}
