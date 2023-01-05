export interface IInput {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (value: React.KeyboardEvent) => void;
}
