export class ChangePasswordDto {
  private _idUser: string;
  private _password: string;
  private _confirmPassword: string;

  constructor(idUser: string, password: string, confirmPassword: string) {
    this._idUser = idUser;
    this._password = password;
    this._confirmPassword = confirmPassword;
  }

  /**
   * Getter idUser
   * @return {string}
   */
  public get idUser(): string {
    return this._idUser;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Getter confirmPassword
   * @return {string}
   */
  public get confirmPassword(): string {
    return this._confirmPassword;
  }

  /**
   * Setter idUser
   * @param {string} value
   */
  public set idUser(value: string) {
    this._idUser = value;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }

  /**
   * Setter confirmPassword
   * @param {string} value
   */
  public set confirmPassword(value: string) {
    this._confirmPassword = value;
  }
}
