import type { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';
import Editor from '../editor/Editor';

export function EditorWidget({
  schema, id, disabled, value, autofocus, onChange, rawErrors = [],
}: WidgetProps) {
  return <Editor data={value || ''} onBlur={(event, editor) => onChange(editor.getData())} />;
}
