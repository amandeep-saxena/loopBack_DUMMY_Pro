import { Client, TestSandbox } from '@loopback/testlab';
import { FileUploadApplication } from '../..';
export declare function setupApplication(fileStorageDirectory?: string): Promise<AppWithClient>;
export interface AppWithClient {
    app: FileUploadApplication;
    client: Client;
}
export declare function getSandbox(): TestSandbox;
