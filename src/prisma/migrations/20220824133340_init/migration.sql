-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'PENDING', 'REVERSED', 'CANCELLED', 'ERROR');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('DEVELOPER', 'QA', 'PROJECT_MANAGER', 'SCRUM_MASTER', 'PRODUCT_OWNER', 'PRODUCER', 'COMPOSER', 'ARRANGER', 'STAFF', 'ENGINEER', 'ILLUSTRATOR', 'MUSICIAN', 'DESIGNER', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('PROPOSAL', 'NEGOTIATION', 'DEVELOPMENT', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('PLACED', 'APROVED', 'CANCELLED', 'PREPARING', 'DISPATCHED', 'FULFILLED', 'ERROR');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CONTENT', 'MUSIC', 'SOFTWARE', 'LIVE', 'BTL', 'MARKETING', 'BRANDING');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "description" JSONB,
    "multimedia" JSONB,
    "supplier_id" TEXT,
    "item_type" "Type" NOT NULL DEFAULT 'SOFTWARE',
    "credits" JSONB,
    "tags" JSONB,
    "performance" JSONB,
    "category_id" TEXT,
    "road_map" JSONB,
    "backlog" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "image" JSONB,
    "markup" DOUBLE PRECISION NOT NULL,
    "contry" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL,
    "performance" JSONB,
    "product_id" TEXT NOT NULL,
    "inventory" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "description" JSONB,
    "roll" JSONB,
    "image" JSONB,
    "tags" JSONB,
    "performance" JSONB,
    "complexity" JSONB,
    "manager_id" TEXT,
    "super_id" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "job_description" JSONB,
    "image" JSONB,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "description" JSONB,
    "tags" JSONB,
    "image" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company" TEXT,
    "use_case" JSONB,
    "comment" TEXT NOT NULL,
    "image" JSONB,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "delivery_info" JSONB NOT NULL,
    "payment_info" JSONB NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "delivery_address" JSONB NOT NULL,
    "delivery_details" JSONB NOT NULL,
    "line_items" JSONB NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "State" NOT NULL DEFAULT 'PLACED',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "account" JSONB NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "description" JSONB,
    "budget" JSONB,
    "timeline" JSONB,
    "proposals" JSONB,
    "stage" "Stage" NOT NULL DEFAULT 'PROPOSAL',
    "progress" DOUBLE PRECISION,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "briefs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "problems" JSONB,
    "must_have" JSONB,
    "stakeholder" JSONB,
    "product_id" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "briefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" JSONB NOT NULL,
    "description" JSONB,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "job_description" JSONB,
    "rol" "Rol" NOT NULL DEFAULT 'DEVELOPER',
    "country" TEXT NOT NULL,
    "image" JSONB,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CatalogToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CatalogToVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MemberToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MemberToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "payments"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "briefs_product_id_key" ON "briefs"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProject_AB_unique" ON "_ProductToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProject_B_index" ON "_ProductToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CatalogToProduct_AB_unique" ON "_CatalogToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CatalogToProduct_B_index" ON "_CatalogToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CatalogToVariant_AB_unique" ON "_CatalogToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_CatalogToVariant_B_index" ON "_CatalogToVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTeam_AB_unique" ON "_ProjectToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTeam_B_index" ON "_ProjectToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToProject_AB_unique" ON "_MemberToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToProject_B_index" ON "_MemberToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToTeam_AB_unique" ON "_MemberToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToTeam_B_index" ON "_MemberToTeam"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_super_id_fkey" FOREIGN KEY ("super_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProject" ADD CONSTRAINT "_ProductToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProject" ADD CONSTRAINT "_ProductToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatalogToProduct" ADD CONSTRAINT "_CatalogToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatalogToProduct" ADD CONSTRAINT "_CatalogToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatalogToVariant" ADD CONSTRAINT "_CatalogToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatalogToVariant" ADD CONSTRAINT "_CatalogToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTeam" ADD CONSTRAINT "_ProjectToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTeam" ADD CONSTRAINT "_ProjectToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToTeam" ADD CONSTRAINT "_MemberToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToTeam" ADD CONSTRAINT "_MemberToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
