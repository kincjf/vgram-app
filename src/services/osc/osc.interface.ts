export interface AbstractApi {
  /**
   * /osc/info
   * @returns {Promise<any>}
   */
  getInfo(): Promise<any>,

  /**
   * /osc/state
   * @returns {Promise<any>}
   */
  getStatus(): Promise<any>,

  getCommandsStatus(id: string): Promise<any>,

  checkForUpdates(): Promise<any>
}

export interface AbstractApiv1 extends AbstractApi {
  startSession(): Promise<any>,

  updateSession(sessionId: string): Promise<any>,

  closeSession(sessionId: string): Promise<any>,

  takePicture(sessionId: string): Promise<any>,

  delete(fileUri: string): Promise<any>,

  /**
   *
   * @returns {Promise<object>}
   */
  listImages(entryCount: number, maxSize: number, continuationToken: string, includeThumb: boolean): Promise<any>,

  /**
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getImage(fileUri: string, maxSize: number): Promise<any>,

  getMetadata(fileUri: string): Promise<any>,

  setOptions(sessionId: string, option: any): Promise<any>,

  getOptions(sessionId: String, Options: Array<String>): Promise<any>
}

export interface AbstractApiv2 extends AbstractApi {

  takePicture(): Promise<any>,

  delete(fileUris: string[]): Promise<any>,

}

