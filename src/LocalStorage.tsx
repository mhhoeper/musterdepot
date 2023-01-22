

export function getFromLS(key: string): any {
    let ls: any = {};
    console.log("getFromLS");
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("musterdepot-storage-"+key) || "");
            console.log("This is what we got: " + global.localStorage.getItem("musterdepot-storage-"+key));
        }
        catch (e) {
            ls = null;
        }
    }
    return ls;
}

export function safeToLS(key: string, value: any) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "musterdepot-storage-"+key,
            JSON.stringify(value)
        );
    }
}
