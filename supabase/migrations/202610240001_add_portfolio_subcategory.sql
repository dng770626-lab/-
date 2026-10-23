alter table public.portfolios
add column if not exists subcategory text;

update public.portfolios
set subcategory = case category
  when 'culture' then 'event-planning'
  when 'promotional' then 'custom-planning-design'
  when 'garden' then 'garden-design'
  when 'outdoor' then 'sign-system'
  when 'architecture' then 'planning-consulting'
end
where subcategory is null;

alter table public.portfolios
alter column subcategory set not null;

alter table public.portfolios
drop constraint if exists portfolios_subcategory_check;

alter table public.portfolios
add constraint portfolios_subcategory_check
check (
  (category = 'culture' and subcategory in ('event-planning', 'exhibition-performance', 'on-site-operations'))
  or (category = 'promotional' and subcategory in ('custom-planning-design', 'daily-goods-souvenirs', 'event-group-gifts'))
  or (category = 'garden' and subcategory in ('garden-design', 'space-styling', 'construction-care'))
  or (category = 'outdoor' and subcategory in ('sign-system', 'signage-guides', 'installation-maintenance'))
  or (category = 'architecture' and subcategory in ('planning-consulting', 'architecture-design', 'construction-management'))
);
