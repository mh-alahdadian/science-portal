import type { WidgetProps } from '@rjsf/utils';
import { Editor } from '../';

export function EditorWidget({ schema, id, disabled, value, autofocus, onChange, rawErrors = [] }: WidgetProps) {
  return <Editor data={value || ''} onBlur={(event, editor) => onChange(editor.getData())} />;
}
