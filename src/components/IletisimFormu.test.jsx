import { afterEach, beforeEach, expect, test } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByLabelText,
  getByRole,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';
import IletisimFormu from './IletisimFormu';

//eksik import buraya
//fixin tuzağı buraya? detaylar readme dosyasında.

beforeEach(() => {
  render(<IletisimFormu />);
});

test('[1] hata olmadan render ediliyor', () => {
  //render(<IletisimFormu />);
});

test('[2] iletişim formu headerı render ediliyor', () => {
  //render(<IletisimFormu />);
  const title = screen.getByText('İletişim Formu');
  expect(title).toBeInTheDocument();
  expect(title).toBeTruthy();
  expect(title).toHaveTextContent('İletişim Formu');
});

test('[3] kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
  const name = screen.getByLabelText('Ad*');
  userEvent.type(name, '123');
  const error = await screen.findAllByTestId('error');
  expect(error).toHaveLength(1);
  //get by label text ile name alanını yakalayınız
  //find all by test id ile error mesajlarını yakalayın
  //to have length ile kontrol edin.
});

test('[4] kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
  const button = screen.getByRole('button');
  userEvent.click(button);
  const error = await screen.findAllByTestId('error');
  expect(error).toHaveLength(3);

  //hiç bir alanı doldurmadan get by role ile butonu yakalayın
  //error mesajlarının to have lengthine bakarak kontrol edin
});

test('[5] kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
  const name = screen.getByTestId('name-input');
  const lastName = screen.getByTestId('lastName-input');

  userEvent.type(name, '12345');
  userEvent.type(lastName, '123');

  const button = screen.getByRole('button');
  userEvent.click(button);

  const error = await screen.findAllByTestId('error');
  expect(error).toHaveLength(1);

  //get by test id ile input alanlarını yakalayın
  //error mesajlarının to have lengthine bakarak kontrol edin
});

test('[6] geçersiz bir mail girildiğinde "Hata: email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  const email = screen.getByTestId('email-input');
  userEvent.type(email, '123');
  const error = await screen.findByTestId('error');
  expect(error).toHaveTextContent(
    'Hata: email geçerli bir email adresi olmalıdır.'
  );

  //errorı get by test id ile yakalayın
  //to have text content ile hata metnini kontrol edin
});

test('[7] soyad girilmeden gönderilirse "Hata: soyad gereklidir." mesajı render ediliyor', async () => {
  const button = screen.getByRole('button');
  userEvent.click(button);
  const errorText = await screen.findByText('Hata: soyad gereklidir.');
  expect(errorText).toBeInTheDocument();
  //find by text ve to be in the document ile hata metni ekranda mı kontrol edin
});

test('[8] ad, soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
  const name = screen.getByTestId('name-input');
  const lastName = screen.getByTestId('lastName-input');
  const email = screen.getByTestId('email-input');

  userEvent.type(name, 'Şerife');
  userEvent.type(lastName, 'Aydın');
  userEvent.type(email, 'serifeaydin@gmail.com');

  const button = screen.getByRole('button');
  userEvent.click(button);

  const renderedName = await screen.findByTestId('firstnameDisplay');
  const renderedSurname = await screen.findByTestId('lastnameDisplay');
  const renderedEmail = await screen.findByTestId('emailDisplay');

  expect(renderedName).toBeInTheDocument();
  expect(renderedSurname).toBeInTheDocument();
  expect(renderedEmail).toBeInTheDocument();
});

test('[9] form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
  const button = screen.getByRole('button');
  userEvent.click(button);

  const name = screen.getByTestId('name-input');
  const lastName = screen.getByTestId('lastName-input');
  const email = screen.getByTestId('email-input');
});

//

//

// BURADAN SONRASINA DOKUNMAYIN //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const testFile = fs
  .readFileSync(path.resolve(__dirname, './IletisimFormu.test.jsx'), 'utf8')
  .replaceAll(/(?:\\r\\n|\\r|\\n| )/g, '');
const tests = testFile.split("test('[");

test('Kontrol: IletisimFormu componenti import edilmiş.', async () => {
  expect(tests[0]).toContain('importIletisimFormufrom');
});

test('Kontrol: test[1] için render metodu kullanılmış', async () => {
  expect(tests[1]).toContain('render(<IletisimFormu');
});

test('Kontrol: test[2] için screen.getByText(...) kullanılmış', async () => {
  expect(tests[2]).toContain('screen.getByText(');
});

test('Kontrol: test[2] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeInTheDocument()');
});

test('Kontrol: test[2] için .toBeTruthy() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeTruthy()');
});

test('Kontrol: test[2] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toHaveTextContent(');
});

test('Kontrol: test[3] için screen.getByLabelText(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.getByLabelText(');
});

test('Kontrol: test[3] için screen.findAllByTestId(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.findAllByTestId(');
});

test('Kontrol: test[3] için findAllByTestId await ile kullanılmış', async () => {
  expect(tests[3]).toContain('awaitscreen.findAllByTestId');
});

test('Kontrol: test[3] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[3]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[4] için .getByRole(...) kullanılmış ', async () => {
  expect(tests[4]).toContain('screen.getByRole(');
});

test('Kontrol: test[4] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[4]).toContain('.toHaveLength(3)');
});

test('Kontrol: test[5] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[5]).toContain('screen.getByTestId(');
});

test('Kontrol: test[5] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[5]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[6] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[6]).toContain('screen.getByTestId(');
});

test('Kontrol: test[6] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[6]).toContain(').toHaveTextContent(');
});

test('Kontrol: test[7] için .findByText(...) await ile kullanılmış', async () => {
  expect(tests[7]).toContain('awaitscreen.findByText(');
});

test('Kontrol: test[7] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[7]).toContain(').toBeInTheDocument()');
});

test('Kontrol: tüm testlerde(test1 hariç) iletişim formu ayrı ayrı render edilmesi yerine beforeEach hooku kullılarak, render içinde yapılmış.', async () => {
  expect(tests[0]).toContain('beforeEach(()=>{');
  expect(tests[0]).toContain('render(<IletisimFormu/>)');
});
