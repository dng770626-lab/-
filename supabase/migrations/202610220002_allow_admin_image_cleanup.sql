create policy "Admins can remove portfolio images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-images'
  and auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
);

