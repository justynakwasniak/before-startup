import { Form, Input, Button, Upload, Select, Card, message } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

import type { UploadRequestOption } from 'rc-upload/lib/interface';


const dummyRequest = ({ onSuccess }: UploadRequestOption) => { 
  setTimeout(() => onSuccess && onSuccess("ok"), 100); 
};

const DynamicForm = () => {
  const [form] = Form.useForm();

  interface DocumentFormData {
    documents: {
      title?: string;
      type?: string;
      file?: import('antd/es/upload/interface').UploadFile[];
    }[];
  }

  const handleFinish = (values: DocumentFormData) => {
    console.log('Submitted data:', values);
    message.success('Zgłoszenia wysłane!');  
  };

  return  (
    
    <Card title="Dynamiczny formularz zgłoszeń" className="max-w-4xl mx-auto mt-4">
        
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ documents: [{}] }}
      >
        <Form.List name="documents">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  type="inner"
                  title={`Zgłoszenie #${key + 1}`}
                  className="mb-4"
                  extra={
                    <Button
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      danger
                    >
                      Usuń
                    </Button>
                  }
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    label="Nazwa dokumentu"
                    rules={[{ required: true, message: 'Podaj nazwę' }]}
                  >
                    <Input placeholder="np. Umowa najmu" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'type']}
                    label="Typ dokumentu"
                    rules={[{ required: true, message: 'Wybierz typ' }]}
                  >
                    <Select placeholder="Wybierz typ">
                      <Option value="contract">Umowa</Option>
                      <Option value="invoice">Faktura</Option>
                      <Option value="statement">Oświadczenie</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'file']}
                    label="Plik"
                    valuePropName="fileList"
                    getValueFromEvent={(e: import('antd/es/upload').UploadChangeParam) => Array.isArray(e) ? e : e?.fileList}
                    rules={[{message: 'Dodaj plik' }]}
                  >
                    <Upload
                      customRequest={dummyRequest}
                      maxCount={1}
                      beforeUpload={() => false}
                    >
                      <Button icon={<UploadOutlined />}>Wybierz plik</Button>
                    </Upload>
                  </Form.Item>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Dodaj zgłoszenie
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Wyślij wszystkie zgłoszenia
          </Button>
        </Form.Item>
      </Form>
    </Card>
    
  );
};

export default DynamicForm;
