// (C) 2007-2019 GoodData Corporation
import { isEmpty } from "lodash";

/**
 * This exception is thrown when a fatal error occurs during the data recording.
 *
 * The DataRecorderError is produced in 'log-and-throw' fashion. Code that raises the exception SHOULD do all the
 * necessary logging and cleanup and then throw the DataRecorderError. The top-level error handler then emits
 * message included in the error and exits process with exit code equal to the included `rc` field.
 */
export class DataRecorderError extends Error {
    constructor(message: string, public readonly rc: number) {
        super(message);
    }
}

/*
 * Defines types used across catalog exporter
 */

/**
 * Exporter configuration
 */
export type DataRecorderConfig = {
    /**
     * Hostname where project lives
     */
    hostname: string | null;

    /**
     * Identifier of the project
     */
    projectId: string | null;

    /**
     * User to authenticate as.
     */
    username: string | null;

    /**
     * Password to use for authentication
     */
    password: string | null;

    /**
     * Directory with recordings inputs & outputs.
     */
    recordingDir: string | null;
};

export function isDataRecorderError(obj: any): obj is DataRecorderError {
    return !isEmpty(obj) && (obj as DataRecorderError).rc !== undefined;
}
