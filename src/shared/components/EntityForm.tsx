import { Theme } from '@rjsf/bootstrap-4';
import { ThemeProps, withTheme } from '@rjsf/core';
import { SelectWidget } from './form/SelectWidget';

const Theme5: ThemeProps = {
  ...Theme,
  widgets: { ...Theme.widgets, SelectWidget },
};

export const Form = withTheme(Theme5);
