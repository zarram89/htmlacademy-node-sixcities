export interface FileWriter {
  write(row: string): void;
  end(): Promise<void>;
}
