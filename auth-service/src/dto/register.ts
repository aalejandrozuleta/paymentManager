export class RegisterDto {
  private _name: string;
  private _lastName: string;
  private _identification: string;
  private _birthDate: string;
  private _phone: string;
  private _email: string;
  private _password: string;
  constructor(
    name: string,
    lastName: string,
    identification: string,
    birthDate: string,
    phone: string,
    email: string,
    password: string,
  ) {
    this._name = name;
    this._lastName = lastName;
    this._identification = identification;
    this._birthDate = birthDate;
    this._phone = phone;
    this._email = email;
    this._password = password;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter lastName
   * @return {string}
   */
  public get lastName(): string {
    return this._lastName;
  }

  /**
   * Getter identification
   * @return {string}
   */
  public get identification(): string {
    return this._identification;
  }

  /**
   * Getter birthDate
   * @return {string}
   */
  public get birthDate(): string {
    return this._birthDate;
  }

  /**
   * Getter phone
   * @return {string}
   */
  public get phone(): string {
    return this._phone;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter lastName
   * @param {string} value
   */
  public set lastName(value: string) {
    this._lastName = value;
  }

  /**
   * Setter identification
   * @param {string} value
   */
  public set identification(value: string) {
    this._identification = value;
  }

  /**
   * Setter birthDate
   * @param {string} value
   */
  public set birthDate(value: string) {
    this._birthDate = value;
  }

  /**
   * Setter phone
   * @param {string} value
   */
  public set phone(value: string) {
    this._phone = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }
}
