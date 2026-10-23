alter table public.portfolios
add column if not exists category text;

update public.portfolios
set category = 'culture'
where category is null;

alter table public.portfolios
alter column category set default 'culture',
alter column category set not null;

alter table public.portfolios
drop constraint if exists portfolios_category_check;

alter table public.portfolios
add constraint portfolios_category_check
check (category in ('culture', 'promotional', 'garden', 'outdoor', 'architecture'));
