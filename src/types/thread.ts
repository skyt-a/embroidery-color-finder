export interface ThreadColor {
  id: number;
  manufacturer: string;
  colorNumber: string;
  name?: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hex: string;
}

export interface SelectedColor {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hex: string;
}

export interface ColorMatch {
  threadColor: ThreadColor;
  difference: number;
}
