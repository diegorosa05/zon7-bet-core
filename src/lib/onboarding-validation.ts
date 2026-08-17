import { z } from "zod";

export function limparDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

export function formatarCpf(valor: string) {
  const d = limparDigitos(valor).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

export function formatarTelefone(valor: string) {
  const d = limparDigitos(valor).slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

export function formatarCep(valor: string) {
  return limparDigitos(valor).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
}

export function cpfValido(valor: string) {
  const cpf = limparDigitos(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const digito = (base: string, peso: number) => {
    const soma = base.split("").reduce((acc, n, i) => acc + Number(n) * (peso - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(cpf.slice(0, 9), 10) === Number(cpf[9]) && digito(cpf.slice(0, 10), 11) === Number(cpf[10]);
}

export function idadeEm(nascimento: string) {
  const d = new Date(nascimento);
  if (Number.isNaN(d.getTime())) return -1;
  const hoje = new Date();
  let idade = hoje.getFullYear() - d.getFullYear();
  const m = hoje.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < d.getDate())) idade -= 1;
  return idade;
}

export const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;

export const pessoaisSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(5, "Informe o nome completo.")
    .max(120, "Máximo de 120 caracteres.")
    .refine((v) => v.split(/\s+/).length >= 2, "Informe nome e sobrenome."),
  cpf: z.string().refine(cpfValido, "CPF inválido."),
  nascimento: z
    .string()
    .min(1, "Informe a data de nascimento.")
    .refine((v) => idadeEm(v) >= 0, "Data inválida.")
    .refine((v) => idadeEm(v) >= 18, "É necessário ter 18 anos ou mais.")
    .refine((v) => idadeEm(v) <= 110, "Data de nascimento improvável."),
  email: z.string().trim().email("E-mail inválido.").max(255),
  telefone: z.string().refine((v) => limparDigitos(v).length >= 10, "Telefone inválido (com DDD)."),
});

export const enderecoSchema = z.object({
  cep: z.string().refine((v) => limparDigitos(v).length === 8, "CEP deve ter 8 dígitos."),
  logradouro: z.string().trim().min(3, "Informe o logradouro.").max(160),
  numero: z.string().trim().min(1, "Informe o número.").max(10),
  complemento: z.string().trim().max(60).optional().or(z.literal("")),
  bairro: z.string().trim().min(2, "Informe o bairro.").max(80),
  cidade: z.string().trim().min(2, "Informe a cidade.").max(80),
  uf: z.enum(UFS, { errorMap: () => ({ message: "Selecione o estado." }) }),
});

export type ErrosCampo = Record<string, string>;

export function erros(resultado: z.SafeParseReturnType<unknown, unknown>): ErrosCampo {
  if (resultado.success) return {};
  return resultado.error.issues.reduce<ErrosCampo>((acc, issue) => {
    const campo = String(issue.path[0] ?? "");
    if (campo && !acc[campo]) acc[campo] = issue.message;
    return acc;
  }, {});
}
