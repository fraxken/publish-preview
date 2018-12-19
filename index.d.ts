declare namespace PublishPreview {
    interface TarballFile {
        path: string;
        size: number;
        mode: number;
    }

    interface TarballPackage {
        id: string;
        name: string;
        version: string;
        size: number;
        unpackedSize: number;
        shasum: string;
        integrity: string;
        filename: string;
        entryCount: number;
        bundled: any[];
        files: TarballFile[];
    }
}

export as namespace PublishPreview;
export = PublishPreview;
